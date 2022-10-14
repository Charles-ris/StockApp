import {Injectable} from "@angular/core";
import {BehaviorSubject, forkJoin, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Sentiment, SentimentData, SentimentResponse} from "../types/sentiment";
import {DatePipe} from "@angular/common";
import {StockService} from "./stock.service";

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  sentiment: BehaviorSubject<Sentiment | undefined> = new BehaviorSubject<Sentiment | undefined>(undefined);

  constructor(private readonly httpClient: HttpClient,
              private readonly stockService: StockService,
              private readonly datepipe: DatePipe) {
  }

  getSentiment(symbol: string, fromDate: Date, toDate: Date) {
    this.isLoading.next(true)
    forkJoin([
        this.stockService.getStockInformation(symbol),
        this.httpClient.get<SentimentResponse>(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${symbol}&from=${this.datepipe.transform(fromDate, 'yyyy-MM-dd')}&to=${this.datepipe.transform(toDate, 'yyyy-MM-dd')}&token=bu4f8kn48v6uehqi3cqg`)
      ]
    ).subscribe(([stock,sentiment]) => {
      this.isLoading.next(false);
      this.sentiment.next(this.transformSentimentResponsetoSentiment(fromDate, toDate, sentiment, stock.result[0]?.description));
    });
  }

  destroy() { //todo
    this.sentiment.next(undefined)
  }

  getSentiment2(): Observable<Sentiment | undefined> { //todo
    return this.sentiment.asObservable();
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  transformSentimentResponsetoSentiment(fromDate: Date, toDate: Date, sentiment: SentimentResponse, description: string = ""): Sentiment {
    let res: Sentiment = {symbol: sentiment.symbol, data: [], description: description}
    let itereDate = fromDate
    while (itereDate <= toDate) {
      let sentimentResult = sentiment.data.find(sentimentData => sentimentData.month === itereDate.getMonth() + 1 && sentimentData.year === itereDate.getFullYear())
      let date = new Date(itereDate);
      let sentimentData: SentimentData;
      sentimentData = sentimentResult ? {
        symbol: sentimentResult.symbol,
        date: date,
        mspr: sentimentResult.mspr,
        change: sentimentResult.change
      } as SentimentData : {
        symbol: sentiment.symbol,
        date: date
      } as SentimentData;
      res.data = [...res.data, sentimentData]
      itereDate.setMonth(itereDate.getMonth() + 1)
    }
    return res
  }

}

import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Sentiment} from "../todo/sentiment";

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  isLoading: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  sentiment: BehaviorSubject<Sentiment | undefined> = new BehaviorSubject<Sentiment | undefined>(undefined);

  constructor(private readonly httpClient: HttpClient) {
  }

  getSentiment(symbol: string, fromDate: string, toDate: string) {
    this.isLoading.next(true)
    this.httpClient.get<Sentiment>(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=bu4f8kn48v6uehqi3cqg`)
      .subscribe(sentiment => {
        this.isLoading.next(false);
        this.sentiment.next(sentiment);
      });
  }

  destroy() {
    this.sentiment.next(undefined)
  }
  getSentiment2(): Observable<Sentiment | undefined> {
    return this.sentiment.asObservable();
  }
  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}

import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {SentimentService} from "../../services/sentiment.service";
import {DateService} from "../../services/date.service";
import {Sentiment} from "../../todo/sentiment";

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit, OnDestroy {

  sentiment!: Observable<Sentiment | undefined>;
  isLoading!: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readonly sentimentService: SentimentService,
              private readonly dateService: DateService,
              private readonly datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.sentiment = this.sentimentService.getSentiment2();
    this.isLoading = this.sentimentService.getIsLoading();
    this.route.paramMap.subscribe(e => {
      if (e.get("symbol")) {
        this.getSentiment(e.get("symbol") as string); // todo
      } else {
        console.log('else');
        //this.router.navigate(['']);
      }
    })
  }

  getSentiment(symbol: string) {
    const toDate = this.datepipe.transform(this.dateService.getToDate(), 'yyyy-MM-dd') as string;
    const fromDate = this.datepipe.transform(this.dateService.getFromDate(), 'yyyy-MM-dd') as string;
    this.sentimentService.getSentiment(symbol,fromDate,toDate);
  }

  ngOnDestroy(): void {
    this.sentimentService.destroy(); // todo
  }
  getMonth(monthNumber: number) {
    return this.dateService.getMonthNameFromMonthNumber(monthNumber);
  }
}

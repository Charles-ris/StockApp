import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {SentimentService} from "../../services/sentiment.service";
import {DateService} from "../../services/date.service";
import {Sentiment} from "../../types/sentiment";

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit, OnDestroy {

  MESSAGE_LOADER = 'Collecting data... Please wait a short moment.'

  sentiment!: Observable<Sentiment | undefined>;
  isLoading!: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readonly sentimentService: SentimentService,
              private readonly dateService: DateService
  ) {}

  ngOnInit(): void {
    this.sentiment = this.sentimentService.getSentiment2();
    this.isLoading = this.sentimentService.getIsLoading();
    this.route.paramMap.subscribe(e => {
      if (e.get("symbol")) {
        this.getSentiment(e.get("symbol") as string); // types
      } else {
        this.router.navigate(['']);
      }
    })
  }

  getSentiment(symbol: string) {
    const toDate = this.dateService.getToDate();
    const fromDate = this.dateService.getFromDate();
    this.sentimentService.getSentiment(symbol,fromDate,toDate);
  }

  ngOnDestroy(): void {
    this.sentimentService.destroy(); // todo
  }

  getImageSource(change: number): string{
    return change>0? "assets/increase.png" : "assets/decrease.png"
  }
}

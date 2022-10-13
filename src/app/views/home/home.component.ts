import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, combineAll, combineLatestAll, forkJoin, merge, mergeMap, observable, Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";
import {StockService} from "../../services/stock.service";
import {StockForm, StockFormGroup} from "../../todo/stock.form";
import {Stock} from "../../todo/stock";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  appForm: FormGroup<StockForm> = new StockFormGroup();

  stocks!: Observable<Stock[]>;

  isLoading!: Observable<boolean>;

  constructor(
    private readonly localStorageService : LocalStorageService,
    private readonly stockService : StockService
  ) {
  }

  ngOnInit(): void {
    this.stocks = this.localStorageService.getStock();
    this.isLoading = this.stockService.getIsLoading();
  }

  addStock() {
    this.stockService.getStock(this.appForm.controls.stock.value); // todo
    this.appForm.controls.stock.setValue('');
  }

  remove(indexOfelement: number, stocks: Stock[]) {
    stocks.splice(indexOfelement,1);
    this.localStorageService.setItem("stocks", JSON.stringify(stocks));
  }

  callStock(stockName: string){
    this.stockService.getStock(stockName);
  }
}

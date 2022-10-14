import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../../services/local-storage.service';
import {StockService} from '../../services/stock.service';
import {Stock} from '../../types/stock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stocks!: Observable<Stock[]>;

  isLoading!: Observable<boolean>;

  MESSAGE_LOADER = 'Updating data... Please wait a short moment.'

  constructor(
    private readonly localStorageService : LocalStorageService,
    private readonly stockService : StockService
  ) {
  }

  ngOnInit(): void {
    this.stocks = this.localStorageService.getStock();
    this.isLoading = this.stockService.getIsLoading();
  }

  remove(indexOfelement: number, stocks: Stock[]): void {
    stocks.splice(indexOfelement,1);
    this.localStorageService.setItem('stocks', JSON.stringify(stocks));
  }

  callStock(stockName: string): void {
    this.stockService.getStock(stockName);
  }
}

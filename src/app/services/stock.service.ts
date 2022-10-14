import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {StockQuote, StockSymbol} from '../types/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly httpClient: HttpClient
  ){}

  getStock(stockName: string): void {
   this.isLoading.next(true);
    forkJoin([
      this.getStockQuote(stockName),
      this.getStockInformation(stockName)
      ]
    ).subscribe(([quote, stockInfo]) => {
      this.localStorageService.addStock({stockSymbol: stockName, stockQuote: quote, stockInformation: stockInfo});
      this.isLoading.next(false);
    });
  }

  getStockQuote(stockName: string): Observable<StockQuote> {
    return this.httpClient.get<StockQuote>(`https://finnhub.io/api/v1/quote?symbol=${stockName}&token=bu4f8kn48v6uehqi3cqg`);
  }

  getStockInformation(stockName: string): Observable <StockSymbol> { // types result2
    return this.httpClient.get<StockSymbol>(`https://finnhub.io/api/v1/search?q=${stockName}&token=bu4f8kn48v6uehqi3cqg`);
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}

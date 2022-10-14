import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Stock} from "../types/stock";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private stock: BehaviorSubject<Stock[]> = new BehaviorSubject(<Stock[]>[]);

  constructor(){
    this.stock = new BehaviorSubject(this.getItem());
  }
  getItem(key: string = "stocks"): Stock[] {
    return localStorage.getItem(key)  ? JSON.parse(localStorage.getItem("stocks") as string) : [];
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key,value);
    this.setStock( this.getItem(key));
  }
  getStock(): Observable<Stock[]> {
    return this.stock.asObservable();
  }
  private setStock(stocks: Stock[]) {
    this.stock.next(stocks);
  }

  addStock(stock: Stock) {
    this.setItem("stocks", JSON.stringify([...this.stock.value, stock]));
  }
}

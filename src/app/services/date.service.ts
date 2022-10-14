import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() {
  }

  getToDate(): Date {
    let date = new Date();
    date.setDate(1);
    return date;
  }

  getFromDate(minus: number = 2): Date {
    let date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - minus);
    return date;
  }

}

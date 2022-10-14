import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Stock} from "../../../types/stock";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  @Input()
  stock: Stock | undefined;

  @Input()
  index: number | undefined;

  @Output() remove: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  remover() {
    this.remove.emit(this.index)
  }
}

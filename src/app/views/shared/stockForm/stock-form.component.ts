import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {StockForm, StockFormGroup} from "../../../types/stock.form";
import {Observable} from "rxjs";
import {StockService} from "../../../services/stock.service";

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {
  stockForm: FormGroup<StockForm> = new StockFormGroup();
  isLoading!: Observable<boolean>;
  constructor(private readonly stockService: StockService) {
  }

  ngOnInit(): void {
    this.isLoading = this.stockService.getIsLoading();
  }

  addStock() {
    this.stockService.getStock(this.stockForm.controls.stock.value);
    this.stockForm.controls.stock.setValue('');
  }
}

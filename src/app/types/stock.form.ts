import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface StockForm {
  stock: FormControl<string>;
}

export class StockFormGroup extends FormGroup<StockForm> {
  constructor() {
    super({
      stock: new FormControl<string>('', {nonNullable: true, validators: [Validators.maxLength(5), Validators.required]})
    });
  }
}

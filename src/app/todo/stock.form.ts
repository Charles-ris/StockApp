import {FormControl, FormGroup} from "@angular/forms";


export interface StockForm {
  stock: FormControl<string>;
}

export class StockFormGroup extends FormGroup<StockForm> {
  constructor() {
    let t =  new FormControl<string>('', {nonNullable: true})
    super({
      stock: t // todo
    });
  }
}

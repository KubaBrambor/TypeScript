import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ex150',
  templateUrl: './ex150.component.html',
  styleUrls: ['./ex150.component.scss']
})
export class Ex150Component{
  public exForm: FormGroup;
  private product: {};

  get name() { return this.exForm.get('name') };
  get price() { return this.exForm.get('price') };
  get url() { return this.exForm.get('url') };

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  createForm(){
    this.exForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(1)]],
      price: [null, [Validators.required, Validators.minLength(2)]],
      url: [null, [Validators.required, Validators.pattern('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}')]],
      onsale: ['','']    })
  }

  onSubmit(){
    this.product = Object.assign({}, this.exForm.value)
    console.log(this.product, this.price.invalid)
  }
}

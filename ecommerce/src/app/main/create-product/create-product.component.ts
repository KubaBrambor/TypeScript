import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  public product: Product; 
  public productArr: {}[] = [];
  public confirmed: boolean = false;
  public imageUrlValidatorText: string;
  public quantityValidatorText: string;
  
  constructor() {
    this.product = new Product("", 0, '', false, 0);
  }

  printValue(event) {
    this.product.name = event.toUpperCase()
  }
  createProduct(productForm) {
    console.log(productForm)
    if(productForm.valid){
      this.productArr.push({});
      Object.assign(this.productArr[this.productArr.length-1], this.product)
      this.confirmed = false;
      console.log(this.productArr);
    } else { 
      if(productForm.form.controls.product.controls.productURL.touched){
        this.imageUrlValidatorText = "This field is mandatory! Please paste image URL."
      }
      if(productForm.form.controls.product.controls.productQuantity.value == 0){
        this.quantityValidatorText = "Quantity must be higher than 0."
      }
      console.error("Stock form is in an invalid state.")
    }
    
  }
}

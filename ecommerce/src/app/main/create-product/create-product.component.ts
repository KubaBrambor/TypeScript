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
  public imageUrlValidator: string;
  
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
      console.log(this.productArr);
    } else { 
      if(productForm.form.controls.productURL.touched){
        this.imageUrlValidator = "This field is mandatory! Please paste image URL."
      }
      console.error("Stock form is in an invalid state.")
    }
    
  }
}

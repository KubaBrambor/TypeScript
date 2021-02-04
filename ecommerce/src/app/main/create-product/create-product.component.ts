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
  
  constructor() {
    this.product = new Product("", 0, '', false, 0);
  }

  printValue(event) {
    this.product.name = event.toUpperCase()
  }
  createProduct(productForm) {
    if(productForm.valid){
      this.productArr.push({});
      Object.assign(this.productArr[this.productArr.length-1], this.product)
      console.log(this.productArr);
    } else { 
      console.error("Stock form is in an invalid state.")
    }
    
  }
}

import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  public product: Product; 
  public productArr: Product[];
  
  constructor() {
    this.product = new Product("Margaryna", 0, '', false, 0);
  }

  printValue(event) {
    this.product.name = event.toUpperCase()
  }
  createProduct() {
    this.productArr.push(this.product);
    console.log(this.productArr);
  }
}

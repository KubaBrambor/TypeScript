import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  public product: Product; 
  
  constructor() {
    this.product = new Product("Margaryna", 20, 'url', false, 20);
  }

  printValue(event) {
    this.product.name = event.toUpperCase()
  }
}

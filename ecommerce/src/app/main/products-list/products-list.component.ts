import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  public productsList:Product[];
  public product:any;
  constructor() { }

  ngOnInit() {
    this.productsList =  [
      new Product('Żel', 20, 'obraz', true, 0),
      new Product('Mydło', 10, 'obraz', false, 5),
      new Product('Pasta do zębów', 5, 'obraz', true, 10)
    ];

    this.product = new Product('Stol', 20, 'url', false, 20)
  }

  addQuantity(i){
    this.productsList[i].amount++;
  }
  subtractQuantity(i){
    this.productsList[i].amount--;
  }
  
  productStyles(i, productsList){
    return {
      'positive': productsList[i].inStock(),
      'negative': !productsList[i].inStock()
    }
  } 
}

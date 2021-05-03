import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  public productsList:Product[];
  public product:any;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productsList =  this.productService.getProducts();
    this.product = new Product('Stol', "20", 'url', false, "20")
  }

  addQuantity(i){
    this.productsList[i].amount++;
  }
  subtractQuantity(i){
    this.productsList[i].amount--;
  }
  
  onToggleFavourite(i: number){
    // this.productsList[i].favourite = !this.productsList[i].favourite;
    this.productService.toggleFavourite(i);
    console.log('onToggleFavourite triggered. ')
  }

  productStyles(product){
    return {
      'positive': product.inStock(),
      'negative': !product.inStock()
    }
  } 
}

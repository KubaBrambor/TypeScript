import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { MessageService } from '../../services/message.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [MessageService]
})
export class ProductsListComponent implements OnInit {
  public productsList:Observable<Product[]>;
  public product:any;
  constructor(private productService: ProductService,
              public messageService: MessageService) { }

  ngOnInit() {
    this.productService.getProducts();
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
    this.productService.toggleFavourite(i)
        .subscribe((result: any)=> this.messageService.message = result.msg)
  }

  productStyles(product){
    return {
      'positive': product.inStock(),
      'negative': !product.inStock()
    }
  } 
}

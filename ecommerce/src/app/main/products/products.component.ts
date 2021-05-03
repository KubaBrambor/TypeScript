import { Component, OnInit, Input, Output, EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
public productsArray: Product[];
  @Input() private productClasses;
  @Output() private sendIndex: EventEmitter<number>;
  @Output() private sendIndexSubstract: EventEmitter<number>;
  @Output() private toggleFavourite: EventEmitter<number>;
  public product: Product;
  constructor(private productService: ProductService) {
    this.sendIndex = new EventEmitter<number>();
    this.sendIndexSubstract = new EventEmitter<number>();
    this.toggleFavourite = new EventEmitter<number>();
    
   }

  ngOnInit() {
    this.productsArray = this.productService.getProducts()
  }

  productClassesFunc(i){
    return this.productClasses(i, this.productsArray)
  }

  addQuantity(i){
    this.sendIndex.emit(i)
  }

  subtractQuantity(i){
    this.sendIndexSubstract.emit(i)
  }

  toggleFavouriteEmit(i: number){
    this.toggleFavourite.emit(i);
  }
}

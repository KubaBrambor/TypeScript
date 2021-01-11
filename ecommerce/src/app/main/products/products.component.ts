import { Component, OnInit, Input, Output, EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  @Input() private productClasses;
  @Input() public productsArray: Product[];
  @Output() private sendIndex: EventEmitter<number>;
  @Output() private sendIndexSubstract: EventEmitter<number>;
  public product: Product;
  constructor() {
    this.sendIndex = new EventEmitter<number>();
    this.sendIndexSubstract = new EventEmitter<number>();
   }

  ngOnInit() {
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

}

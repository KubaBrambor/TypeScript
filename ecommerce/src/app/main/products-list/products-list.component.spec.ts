import { TestBed, async } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { ProductsComponent } from '../products/products.component';
import { Product } from '../../model/product';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  it('should have product instantiated on ngInit', () => {
    const productListComponent = new ProductsListComponent();
    expect(productListComponent.product).toBeUndefined();
    productListComponent.ngOnInit();
    expect(productListComponent.product).toEqual(
      new Product('Stol', 20, 'url', false, 20));
  });

  it('should add product to favourite', () => {
    const productListComponent = new ProductsListComponent();
    productListComponent.ngOnInit();
    expect(productListComponent.productsList[0].favourite).toBeFalsy();
    productListComponent.productsList[0].favourite = true;
    expect(productListComponent.productsList[0].favourite).toBeTruthy();
  })

  it('should add amount', () => {
    const productListComponent = new ProductsListComponent();
    productListComponent.ngOnInit();
    expect(productListComponent.productsList[1].amount).toEqual(1);
    productListComponent.addQuantity(1);
    expect(productListComponent.productsList[1].amount).toEqual(2);
  })
})
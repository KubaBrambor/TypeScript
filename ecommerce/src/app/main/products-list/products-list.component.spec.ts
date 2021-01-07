import { ProductsListComponent } from './products-list.component';
import { Product } from '../../model/product';

describe('AppComponent', () => {
  it('should have product instantiated on ngInit', () => {
    const productListComponent = new ProductsListComponent();
    expect(productListComponent.product).toBeUndefined();
    productListComponent.ngOnInit();
    expect(productListComponent.product).toEqual(
      new Product('Stol', 20, 'url', false, 20));
  });

  it('should add product', () => {
    const productListComponent = new ProductsListComponent();
    productListComponent.ngOnInit();
    expect(productListComponent.productsList[0].favourite).toBeFalsy()
  })
})
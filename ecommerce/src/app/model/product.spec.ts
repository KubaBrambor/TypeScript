import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product('Stol', 20, 'url', false, 20)).toBeTruthy();
  });
});

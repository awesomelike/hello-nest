import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('PRODUCT_NOT_FOUND');
    }
    return [product, productIndex];
  }

  getProducts() {
    return [...this.products];
  }

  getById(id: string) {
    const [product] = this.findProduct(id);
    return { ...product };
  }

  insert(title: string, description: string, price: number) {
    const id = uuidv4();
    const product = new Product(id, title, description, price);
    this.products.push(product);
    return id;
  }

  update(id: string, newProduct: Product) {
    const [product, productIndex] = this.findProduct(id);
    const updatedProduct = { ...product };
    if (newProduct.title) {
      updatedProduct.title = newProduct.title;
    }
    if (newProduct.description) {
      updatedProduct.description = newProduct.description;
    }
    if (newProduct.price) {
      updatedProduct.price = newProduct.price;
    }
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  delete(id: string) {
    const [, index] = this.findProduct(id);
    this.products.splice(index, 1);
  }
}

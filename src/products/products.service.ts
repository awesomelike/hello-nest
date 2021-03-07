import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private ProductModel: Model<Product>) {}

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

  async insert(title: string, description: string, price: number) {
    const product = new this.ProductModel({ title, description, price });
    const result = await product.save();
    return result;
  }

  update(id: string, newProduct: Product) {
    return { id: 1, title: 'asd', description: '', price: 2 };
  }

  delete(id: string) {
    const [, index] = this.findProduct(id);
    this.products.splice(index, 1);
  }
}

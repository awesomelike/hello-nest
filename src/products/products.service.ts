import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductDocument } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel: Model<ProductDocument>,
  ) {}

  private async findProduct(id: string): Promise<ProductDocument> {
    const product = await this.ProductModel.findOne({ _id: id });

    if (!product) {
      throw new NotFoundException('PRODUCT_NOT_FOUND');
    }
    return product;
  }

  async getProducts() {
    const products = await this.ProductModel.find({});
    return products as ProductDocument[];
  }

  async getById(id: string): Promise<ProductDocument> {
    const product = await this.findProduct(id);
    return product;
  }

  async insert(title: string, description: string, price: number) {
    const product = new this.ProductModel({ title, description, price });
    const result = await product.save();
    return result.id;
  }

  async update(id: string, newProduct: ProductDocument) {
    const product = await this.ProductModel.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async delete(id: string) {
    await this.ProductModel.deleteOne({ _id: id });
  }
}

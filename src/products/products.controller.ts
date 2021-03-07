import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDocument } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async listProducts(): Promise<ProductDocument[]> {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async loadProduct(@Param('id') id: string) {
    return await this.productsService.getById(id);
  }

  @Post()
  async addProduct(@Body() body: ProductDocument) {
    const { title, description, price } = body;
    const insertId = await this.productsService.insert(
      title,
      description,
      price,
    );
    return { id: insertId };
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: ProductDocument) {
    const updated = await this.productsService.update(id, body);
    return updated;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productsService.delete(id);
    return { message: 'OK' };
  }
}

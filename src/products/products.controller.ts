import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  listProducts(): Product[] {
    return this.productsService.getProducts();
  }

  @Get(':id')
  loadProduct(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  @Post()
  async addProduct(@Body() body: Product) {
    const { title, description, price } = body;
    const insertId = await this.productsService.insert(
      title,
      description,
      price,
    );
    return { id: insertId };
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: Product) {
    const updated = this.productsService.update(id, body);
    return updated;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.productsService.delete(id);
    return { message: 'OK' };
  }
}

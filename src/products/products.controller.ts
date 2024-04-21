import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product-dto';
import { ProductsService } from './products.service';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from './products.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { ErrorResponceDto } from 'src/exceptions/dto/error-responce-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/users.model';

@ApiTags('Товары')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // Create product
  @ApiOperation({ summary: 'Создать товар' })
  @ApiResponse({ status: 201, type: Product, description: 'Успешный запрос' })
  @ApiConflictResponse({
    type: ErrorResponceDto,
    description: 'Товар с таким названием или артикулом уже существует!',
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponceDto,
    description:
      'Произошла ошибка при создании товара! Повторите попытку позже.',
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createProduct(@Body() productDto: CreateProductDto, @UploadedFile() image) {
    return this.productsService.createProduct(productDto, image);
  }

  // Get all products
  @ApiOperation({ summary: 'Получить все товары' })
  @ApiResponse({ status: 200, type: [Product], description: 'Успешный запрос' })
  @ApiNotFoundResponse({
    type: ErrorResponceDto,
    description: 'Товары не найдены!',
  })
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  // Get product by id
  @ApiOperation({ summary: 'Получить товар по id' })
  @ApiResponse({ status: 200, type: Product, description: 'Успешный запрос' })
  @ApiNotFoundResponse({
    type: ErrorResponceDto,
    description: 'Товар с таким id не найден',
  })
  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  // Remove all products
  @ApiOperation({ summary: 'Удалить все товары' })
  @ApiResponse({ status: 200, description: 'Успешный запрос' })
  @ApiNotFoundResponse({
    type: ErrorResponceDto,
    description:
      'Товары не найдены или произошла ошибка при удалении! Повторите попытку позже.',
  })
  @Delete()
  removeAllProducts() {
    return this.productsService.removeAllProducts();
  }

  // Remove product by id
  @ApiOperation({ summary: 'Удалить товар по id' })
  @ApiResponse({ status: 200, description: 'Успешный запрос' })
  @ApiNotFoundResponse({
    type: ErrorResponceDto,
    description: 'Товар с таким id не найден',
  })
  @Delete('/:id')
  removeProduct(@Param('id') id: number) {
    return this.productsService.removeProduct(id);
  }

  @ApiOperation({ summary: 'Лайкнуть/дизлайкнуть товар по id' })
  @ApiResponse({ status: 200, type: User, description: 'Успешный запрос' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponceDto,
    description: 'Произошла ошибка при лайке товара! Повторите попытку позже.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/like/:id')
  toggleLikeProduct(@Request() req, @Param('id') id: number) {
    return this.productsService.toggleLike(req.user.id, id);
  }
}

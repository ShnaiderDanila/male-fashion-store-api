import { FilesService } from './../files/files.service';
import { CreateProductDto } from './dto/create-product-dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private fileService: FilesService,
    private userService: UsersService,
  ) {}

  async createProduct(dto: CreateProductDto, image: any) {
    if (dto.name) {
      const existProduct = await this.getProductByName(dto.name);
      if (existProduct) {
        throw new ConflictException('Товар с таким названием уже существует!');
      }
    }

    if (dto.productCode) {
      const existProduct = await this.getProductByProductCode(dto.productCode);
      if (existProduct) {
        throw new ConflictException('Товар с таким артикулом уже существует!');
      }
    }

    try {
      const fileName = await this.fileService.createFile(image);
      const product = await this.productRepository.create({
        ...dto,
        image: fileName,
      });
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при создании товара! Повторите попытку позже.',
      );
    }
  }

  private async getProductByProductCode(productCode: string) {
    const product = await this.productRepository.findOne({
      where: { productCode },
      include: { all: true },
    });
    return product;
  }

  private async getProductByName(name: string) {
    const product = await this.productRepository.findOne({
      where: { name },
      include: { all: true },
    });
    return product;
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Товар с таким id не найден!');
    }
    return product;
  }

  async getAllProducts() {
    const products = await this.productRepository.findAll();

    if (!products.length) {
      throw new NotFoundException('Товары не найдены!');
    }

    return products;
  }

  async removeProduct(id: number) {
    const product = await this.productRepository.destroy({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Товар с таким id не найден');
    }

    return product;
  }

  async removeAllProducts() {
    try {
      const product = await this.productRepository.truncate();
      return product;
    } catch (error) {
      throw new NotFoundException(
        'Товары не найдены или произошла ошибка при удалении! Повторите попытку позже.',
      );
    }
  }

  async toggleLike(userId: number, productId: number) {
    const product = await this.getProductById(productId);
    const user = await this.userService.getUserById(userId);

    const existLike = user.wishlist.find(
      (likedProduct) => likedProduct.id === product.id,
    );

    try {
      if (existLike) {
        await user.$remove('wishlist', product.id);
        const index = user.wishlist.findIndex((item) => item.id === product.id);
        if (index !== -1) {
          user.wishlist.splice(index, 1);
        }
      } else {
        await user.$add('wishlist', product.id);
        user.wishlist.push(product);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при лайке товара! Повторите попытку позже.',
      );
    }
  }
}

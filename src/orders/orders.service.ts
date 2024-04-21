import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order-dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    private userService: UsersService,
  ) {}

  async createOrder(userID: number, dto: CreateOrderDto) {
    const user = await this.userService.getUserById(userID);

    const totalPrice = Math.round(
      dto.products.reduce(
        (previousItem, currentItem) =>
          previousItem + Number(currentItem.price) * currentItem.count,
        0,
      ),
    );

    try {
      const order = await this.orderRepository.create({
        ...dto,
        totalPrice,
      });

      await user.$add('orders', order);
      user.orders.push(order);

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при создании заказа! Повторите попытку позже.',
      );
    }
  }
}

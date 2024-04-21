import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order-dto';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { ErrorResponceDto } from 'src/exceptions/dto/error-responce-dto';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Создать заказ' })
  @ApiResponse({ status: 200, type: User, description: 'Успешный запрос' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponceDto,
    description:
      'Произошла ошибка при создании заказа! Повторите попытку позже.',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Request() req, @Body() orderDto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.id, orderDto);
  }
}

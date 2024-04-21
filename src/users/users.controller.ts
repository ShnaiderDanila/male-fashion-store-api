import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './users.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user-dto';
import { UpdateUserPasswordDto } from './dto/update-user-password-dto';
import { ErrorResponceDto } from 'src/exceptions/dto/error-responce-dto';
import { Product } from 'src/products/products.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // Get all users
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User], description: 'Успешный запрос' })
  @ApiNotFoundResponse({
    type: ErrorResponceDto,
    description: 'Пользователи не найдены!',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // Get current user
  @ApiOperation({ summary: 'Получить текущего пользователя' })
  @ApiResponse({ status: 200, type: User, description: 'Успешный запрос' })
  @ApiNotFoundResponse({
    type: ErrorResponceDto,
    description: 'Пользователь с таким id не найден!',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/current')
  getUserById(@Request() req) {
    return this.userService.getUserById(req.user.id);
  }

  // Update current user
  @ApiOperation({ summary: 'Обновить данные текущего пользователя' })
  @ApiResponse({ status: 200, type: User, description: 'Успешный запрос' })
  @ApiConflictResponse({
    type: ErrorResponceDto,
    description:
      'Пользователь с таким номером телефона или email уже существует!',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  updateUserInfo(@Body() userDto: UpdateUserDto, @Request() req) {
    return this.userService.updateUserInfo(req.user.id, userDto);
  }

  // Update password current user
  @ApiOperation({ summary: 'Обновить пароль текущего пользователя' })
  @ApiResponse({ status: 200, type: User, description: 'Успешный запрос' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponceDto,
    description:
      'Внутренняя ошибка сервера! Попробуйте позже или обратитесь в техническую поддержку.',
  })
  @UseGuards(JwtAuthGuard)
  @Put('/update/password')
  updateUserPassword(@Body() userDto: UpdateUserPasswordDto, @Request() req) {
    return this.userService.updateUserPassword(req.user.id, userDto);
  }

  @ApiOperation({ summary: 'Получить список избранного текущего пользователя' })
  @ApiResponse({ status: 200, type: [Product], description: 'Успешный запрос' })
  @ApiNotFoundResponse({
    type: ErrorResponceDto,
    description: 'Пользователь с таким id не найден!',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/current/wishlist')
  getCurrentUserWishlist(@Request() req) {
    return this.userService.getUserWishlist(req.user.id);
  }
}

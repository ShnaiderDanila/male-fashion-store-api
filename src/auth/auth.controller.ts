import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { Token, User } from 'src/users/users.model';
import { ErrorResponceDto } from 'src/exceptions/dto/error-responce-dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Войти в систему' })
  @ApiResponse({
    status: 200,
    description: 'Успешный запрос',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            user: {
              $ref: getSchemaPath(User),
            },
            token: {
              $ref: getSchemaPath(Token),
            },
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponceDto,
    description: 'Неверный адрес электронной почты или пароль!',
  })
  @Post('/login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Зарегистрироваться' })
  @ApiResponse({
    status: 201,
    description: 'Успешный запрос',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            user: {
              $ref: getSchemaPath(User),
            },
            token: {
              $ref: getSchemaPath(Token),
            },
          },
        },
      },
    },
  })
  @ApiConflictResponse({
    type: ErrorResponceDto,
    description:
      'Пользователь с таким email или номером телефона уже существует!',
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponceDto,
    description:
      'Внутренняя ошибка сервера! Попробуйте позже или обратитесь в техническую поддержку.',
  })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}

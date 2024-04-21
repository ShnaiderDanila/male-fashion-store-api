import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    const token = await this.generateToken(user);
    return { user, ...token };
  }

  async registration(userDto: CreateUserDto) {
    if (userDto.email) {
      const existUser = await this.userService.getUserByEmail(userDto.email);
      if (existUser) {
        throw new ConflictException(
          'Пользователь с таким email уже существует!',
        );
      }
    }

    if (userDto.phoneNumber) {
      const existUser = await this.userService.getUserByPhoneNumber(
        userDto.phoneNumber,
      );
      if (existUser) {
        throw new ConflictException(
          'Пользователь с таким номером телефона уже существует!',
        );
      }
    }

    try {
      const hashPassword = await bcrypt.hash(userDto.password, 10);
      const user = await this.userService.createUser({
        ...userDto,
        password: hashPassword,
      });

      const token = await this.generateToken(user);

      return { user, ...token };
    } catch (error) {
      throw new InternalServerErrorException(
        'Внутренняя ошибка сервера! Попробуйте позже или обратитесь в техническую поддержку.',
      );
    }
  }

  private async generateToken(user: User) {
    const payload = { id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(loginDto: LoginUserDto) {
    try {
      const user = await this.userService.getUserByEmail(loginDto.email);
      const passwordEquals = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (user && passwordEquals) {
        return user;
      }
      throw new UnauthorizedException({
        message: 'Неверный адрес электронной почты или пароль!',
      });
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Неверный адрес электронной почты или пароль!',
      });
    }
  }
}

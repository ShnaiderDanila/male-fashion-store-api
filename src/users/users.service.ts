import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserPasswordDto } from './dto/update-user-password-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async getUserByPhoneNumber(phoneNumber: string) {
    const user = await this.userRepository.findOne({
      where: { phoneNumber },
      include: { all: true },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });

    if (!user) {
      throw new NotFoundException('Пользователь с таким id не найден!');
    }

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();

    if (!users.length) {
      throw new NotFoundException('Пользователи не найдены!');
    }

    return users;
  }

  async updateUserInfo(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.getUserById(id);
      const updatedUser = await user.update(
        {
          firstName: dto.firstName,
          lastName: dto.lastName,
          phoneNumber: dto.phoneNumber,
          address: dto.address,
          email: dto.email,
        },
        { where: { id } },
      );
      return updatedUser;
    } catch (err) {
      throw new ConflictException(
        'Пользователь с таким номером телефона или email уже существует!',
      );
    }
  }

  async updateUserPassword(id: number, dto: UpdateUserPasswordDto) {
    try {
      const user = await this.getUserById(id);
      const dtoHashPassword = await bcrypt.hash(dto.password, 10);
      const updatedUser = await user.update({ password: dtoHashPassword });
      return updatedUser;
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя ошибка сервера! Попробуйте позже или обратитесь в техническую поддержку.',
      );
    }
  }

  async getUserWishlist(id: number) {
    const user = await this.getUserById(id);
    return user.wishlist;
  }
}

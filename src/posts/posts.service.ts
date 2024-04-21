import { FilesService } from '../files/files.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostModel } from './posts.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel) private postRepository: typeof PostModel,
    private fileService: FilesService,
  ) {}

  async createPost(dto: CreatePostDto, image: any) {
    const existPost = await this.getPostByTitle(dto.title);
    if (existPost) {
      throw new ConflictException('Пост с таким заголовком уже существует!');
    }

    try {
      const fileName = await this.fileService.createFile(image);
      const post = await this.postRepository.create({
        ...dto,
        image: fileName,
      });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(
        'Произошла ошибка при создании поста! Повторите попытку позже.',
      );
    }
  }

  private async getPostByTitle(title: string) {
    const post = await this.postRepository.findOne({
      where: { title },
    });
    return post;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
    });
    if (!post) {
      throw new NotFoundException('Пост с таким id не найден!');
    }
    return post;
  }

  async getAllPosts() {
    const posts = await this.postRepository.findAll();

    if (!posts.length) {
      throw new NotFoundException('Посты не найдены!');
    }

    return posts;
  }

  async removePost(id: number) {
    const post = await this.postRepository.destroy({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Пост с таким id не найден!');
    }

    return post;
  }

  async removeAllPosts() {
    try {
      const post = await this.postRepository.truncate();
      return post;
    } catch (error) {
      throw new NotFoundException(
        'Посты не найдены или произошла ошибка при удалении! Повторите попытку позже.',
      );
    }
  }
}

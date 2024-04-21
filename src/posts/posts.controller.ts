import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { PostsService } from './posts.service';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostModel } from './posts.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { ErrorResponceDto } from 'src/exceptions/dto/error-responce-dto';

@ApiTags('Посты блога')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // Create post
  @ApiOperation({ summary: 'Создать пост' })
  @ApiResponse({
    status: 201,
    type: PostModel,
    description: 'Успешный запрос',
  })
  @ApiConflictResponse({
    type: ErrorResponceDto,
    description: 'Пост с таким заголовком уже существует!',
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponceDto,
    description:
      'Произошла ошибка при создании поста! Повторите попытку позже.',
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() postDto: CreatePostDto, @UploadedFile() image) {
    return this.postsService.createPost(postDto, image);
  }

  // Get all posts
  @ApiOperation({ summary: 'Получить все посты' })
  @ApiResponse({
    status: 200,
    type: [PostModel],
    description: 'Успешный запрос',
  })
  @ApiNotFoundResponse({
    type: ErrorResponceDto,
    description: 'Посты не найдены!',
  })
  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  // Get post by id
  @ApiOperation({ summary: 'Получить пост по id' })
  @ApiResponse({ status: 200, type: PostModel, description: 'Успешный запрос' })
  @ApiNotFoundResponse({
    type: ErrorResponceDto,
    description: 'Пост с таким id не найден!',
  })
  @Get('/:id')
  getPostById(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  // Remove all posts
  @ApiOperation({ summary: 'Удалить все посты' })
  @ApiResponse({ status: 200, description: 'Успешный запрос' })
  @ApiNotFoundResponse({
    type: ErrorResponceDto,
    description:
      'Посты не найдены или произошла ошибка при удалении! Повторите попытку позже.',
  })
  @Delete()
  removeAllPosts() {
    return this.postsService.removeAllPosts();
  }

  // Remove post by id
  @ApiOperation({ summary: 'Удалить пост по id' })
  @ApiResponse({ status: 200, description: 'Успешный запрос' })
  @ApiNotFoundResponse({
    type: ErrorResponceDto,
    description: 'Пост с таким id не найден!',
  })
  @Delete('/:id')
  removePost(@Param('id') id: number) {
    return this.postsService.removePost(id);
  }
}

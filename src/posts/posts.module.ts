import { PostsController } from './posts.controller.js';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostModel } from './posts.model.js';
import { FilesModule } from '../files/files.module.js';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([PostModel]), FilesModule],
})
export class PostsModule {}

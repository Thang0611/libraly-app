import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ConfigService } from 'aws-sdk';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './ImageEntity';

@Module({
  imports:[TypeOrmModule.forFeature([ImageEntity])],
  providers: [ImageService],
  controllers: [ImageController,],
  exports:[ImageService]
})
export class ImageModule {}

import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { ImageModule } from '../image/image.module';
import { ReviewModule } from '../review/review.module';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([BookEntity]),ImageModule,ReviewModule,UserModule],
  providers: [BookService],
  controllers: [BookController],
  exports:[BookService]
})
export class BookModule {}

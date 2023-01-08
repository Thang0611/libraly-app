import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([ReviewEntity]),UserModule],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports:[ReviewService]
})
export class ReviewModule {}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddReviewDto } from 'src/dto/addReviewDto';
import { ReviewEntity } from './review.entity';
import { UserService } from '../user/user.service';



@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity)
        private reviewRepository:Repository<ReviewEntity>,
        private userService:UserService,
    ){}

    async createReview(book,review:AddReviewDto){
        console.log(review)
        const user=await this.userService.findUserById(review.userId);
        console.log('create rv')
        console.log(user)
        const newReview =this.reviewRepository.create(review)
        newReview.book=book
        newReview.user=user
        console.log(newReview)
        return  this.reviewRepository.save(newReview)  
    }

}

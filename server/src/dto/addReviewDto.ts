import { IsNegative, IsNotEmpty, IsPositive, Max, Min } from "class-validator";
import { UserEntity } from '../user/user.entity';

export class AddReviewDto{
    @IsNotEmpty({message:'Sao không được để trống'})
    @IsPositive()
    @Min(1,{message:'Số sao không hợp lệ'})
    @Max(5,{message:'Số sao không hợp lệ'})
    star:number;
    @IsNotEmpty({message:'Đánh giá không được để trống'})
    comment:string
    @IsNotEmpty({message:'Người đánh giá không xác định'})
    userId:string;
}
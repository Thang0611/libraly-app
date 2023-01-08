import { IsNotEmpty, Min, IsPositive } from 'class-validator';
import { Type } from "class-transformer";

export class OrderDto{
    @IsNotEmpty({message:'Người dùng không xác định!'})
    userId:string   
    @IsNotEmpty({message:'Sách không xác định!'})
    bookId:string
    @Type(() => Number)
    @IsNotEmpty({message:'Số lượng không xác định!'})
    @Min(1,{message:'Số lượng nhỏ nhất là 1'})
    amount:number
}
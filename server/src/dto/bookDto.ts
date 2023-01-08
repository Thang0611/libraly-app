import {  Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsPositive } from "class-validator";
import { ImageEntity } from "src/image/ImageEntity";

export class BookDto{
    
    @IsNotEmpty({message:'Tiêu đề không được để trống'})
    title:string;
    @IsNotEmpty({message:'Tác giả không được để trống'})
    author:string;
    @IsNotEmpty({message:'Thể loại không được để trống'})
    category:string;
    @IsNotEmpty({message:'Nhà xuất bản không được để trống'})
    publishingCompany:string;
    @Type(() => Date)
    @IsDate({message:'Ngày sai định dạng'})
    @IsNotEmpty({message:'Ngày xuất bản không được để trống'})
    date:Date;
    @Type(() => Number)
    @IsPositive({message:'Số trang phải là số dương'})
    @IsNotEmpty({message:'Số trang không được để trống'})
    numOfPage:number;
    @IsNotEmpty({message:'Mô tả không được để trống'})
    decription:string;
    @Type(() => Number)
    @IsNotEmpty({message:'Số lượng không được để trống'})
    @IsPositive({message:'Số lượng phải là số dương'})
    amount:number;
    image?: ImageEntity
}



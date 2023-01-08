import { IsEmail, IsNotEmpty, IsString, } from "class-validator";

export class registerDto{

    @IsNotEmpty({message:'Tên đăng nhập không được để trống! '})
    username : string;

    @IsNotEmpty({message:'Mật khẩu không được để trống! '})
    password:string;

    @IsNotEmpty({message:'Nhập lại Password không được để trống! '})
    passwordcf:string;

    @IsNotEmpty({message:'Họ và tên không được để trống!'})
    fullname:string;
    @IsEmail({},{message:'Email sai định dạng'})
    @IsNotEmpty({message:'Email không được để trống '})
    email:string;
    // @IsString()
    // role:string
}
import { IsNotEmpty } from "class-validator";

export class loginDto{

    @IsNotEmpty({message:'Tên đăng nhập không được để trống'})
    username:string;

    @IsNotEmpty({message:'Mật khẩu không được để trống'})
    password:string
    
}
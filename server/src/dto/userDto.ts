import { IsEmail, IsString, } from "class-validator";
import { Role } from "src/auth/emuns/role.enum";

export class UserDto{
    @IsString({message:'Tên đăng nhập không được để trống!'})
    username : string;
    @IsString({message:'Mật khẩu không được để trống!'})
    password:string;
    @IsString({message:'Họ và tên không được để trống!'})
    fullname:string;
    @IsEmail({message:'Email không được để trống!'})
    email:string;

    role:Role
}
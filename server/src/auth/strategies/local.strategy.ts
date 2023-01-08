import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super()
    }
    async validate(username:string,password:string){
        if(!(username&&password)){
            throw new HttpException(['Không được để trống thông tin'],HttpStatus.BAD_REQUEST)
        }
        const user=await this.authService.validateUser(username,password)
        if (!user){
            console.log(3)
            throw new UnauthorizedException(['Đăng nhập thất bại']);
        }
        console.log(0)
        return user
        
    }
}
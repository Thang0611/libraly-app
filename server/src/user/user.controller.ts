import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { registerDto } from 'src/dto/registerDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private UserService:UserService){}
    @Post('/register')
    async register(@Body() registerDto: registerDto,@Res() res) {
    const user = await this.UserService.addUser(registerDto);
    console.log(user)
    return res.status(HttpStatus.OK).json({
      ...user,
      message:'Đăng kí thành công'
    }
    
    )
  }
  @Get('getall')
    async getAllUser(){
      return this.UserService.findAllUser()
    }
}

import { Controller, Request, Get, Post, Body, UseGuards, Res, HttpStatus } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

import { Roles } from './decorators/roles.decorator';
import { Role } from './emuns/role.enum';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { loginDto } from 'src/dto/loginDto';
// import RoleGuard from './guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

//   @Post('/register')
//   async register(@Body() registerDto: registerDto) {
//     const user = await this.userService.addUser(registerDto);
//     console.log(user)
//     return user;
//   }


  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req,@Body() loginDto: loginDto ,@Res() res) {
    console.log('end')
    const data= await this.authService.login(req.user)
    return res.status(HttpStatus.OK).json(
      {
        ...data,
        message:'Đăng nhập thành công'
      }
    );
  }



  @UseGuards(JwtAuthGuard)
  @Get('/home')
  home(){
    return 'this is home page'
  }
  // @UseGuards(AuthGuard('jwt'), RoleGuard)
    // @UseGuards(AuthGuard('jwt'))
  @Roles(Role.User)
  @Get('/user')
  getProfile(@Request() req) {
    return req.user;
  }

  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  getDashboard(@Request() req) {
    return req.user;
  }
}
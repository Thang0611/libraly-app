import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {} // 2

  async validateUser(username: string, password: string): Promise<any> {
    console.log(1)
    const user = await this.userService.findUser(username);
    console.log(2)
    if (user){
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
          );
        if(isPasswordMatch)
        return user;
    }
    return null;
  }
  async login(user: any) {
    
    const payload = { userid:user.id,username: user.username,fullname:user.fullname,role:user.role,email:user.email};
    console.log(payload)
    return {
      token: this.jwtService.sign(payload),
      payload
    };
  }
}

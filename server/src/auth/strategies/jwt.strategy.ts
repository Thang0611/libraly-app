import { PassportStrategy } from '@nestjs/passport';
import 'dotenv/config'
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { userInfo } from 'os';
import { jwtConstants } from '../constains';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            // secretOrKey:jwtConstants.secret,
        })
    }
    async validate(payload: any) {
        return { userid:payload.userid,username: payload.username,fullname:payload.fullname, role: payload.role,email:payload.email };
      }
}
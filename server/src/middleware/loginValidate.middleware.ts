import { NestMiddleware, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from "express";
import { loginDto } from 'src/dto/loginDto';

export class LoginValidateMiddleware implements NestMiddleware{
    async use(req: Request, res: Response, next: NextFunction) {
        const body = req.body;
        const login = new loginDto()
        const errors = [];
        Object.keys(body).forEach((key) => {
            login[key] = body[key];
          });
        
        try {
            await validateOrReject(login);
          } catch (errs) {
            errs.forEach((err) => {
              Object.values(err.constraints).forEach((constraint) =>
                errors.push(constraint),
              );
            });
          }
      
          if (errors.length) {
            throw new BadRequestException(errors);
          }
        next();
      }
}
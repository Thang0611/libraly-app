import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from 'aws-sdk';
import * as dotenv from 'dotenv' 
dotenv.config()
// import { NextFunction, Request, Response } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true,});
  // app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      transform: true,
      skipUndefinedProperties: true, // when activated, it works, but does not validate
      enableDebugMessages: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalPipes(new ValidationPipe({exceptionFactory: (errors) => new BadRequestException(errors),}));
  console.log(process.env.PORT)
  await app.listen(process.env.PORT);
  app.enableCors();
  app.use(cookieParser())

  // const configService = app.get(ConfigService);
  config.update({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID, //configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY, //configService.get('AWS_SECRET_ACCESS_KEY'),
    region:process.env.AWS_REGION, //configService.get('AWS_REGION'),
    
  });

  }
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { BookModule } from './book/book.module';
import { BookEntity } from './book/book.entity';
import { AuthModule } from './auth/auth.module';

import * as dotenv from 'dotenv';

import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
// import { CartModule } from './cart/cart.module';
import RoleGuard from './auth/guards/role.guard';
import { ImageEntity } from './image/ImageEntity';
import { ImageModule } from './image/image.module';
import { ReviewEntity } from './review/review.entity';
import { ReviewModule } from './review/review.module';
// import { OrderModule } from './order/order.module';
// import { CartItemModule } from './cart-item/cart-item.module';
// import { CartEntity } from './cart/cart.entity';
// import { CartItemEntity } from './cart-item/cart-item.entity';

import { OrderModule } from './order/order.module';
import { OrderEntity } from './order/order.entity';



dotenv.config();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'b19dcat187',
      database: 'libraly_app',
      entities: [UserEntity,BookEntity,ImageEntity,ReviewEntity,OrderEntity],
      synchronize: true

      // type: 'mysql',
      // host: process.env.DATABASE_URL,
      // port: 19057,
      // username: process.env.TYPEORM_USERNAME,
      // password: process.env.TYPEORM_PASSWORD,
      // database: process.env.TYPEORM_DATABASE,
      // entities: [UserEntity,BookEntity,ImageEntity],
      // synchronize: true,
      
    }),
    BookModule,
    AuthModule,
    ImageModule,
    ReviewModule,
    OrderModule,
  ],
    controllers: [AppController],
    providers: [AppService,
    //   {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
    ],
  })
  
export class AppModule {

}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookModule } from '../book/book.module';
import { UserModule } from '../user/user.module';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Module({
    imports:[TypeOrmModule.forFeature([OrderEntity]),BookModule,UserModule],
    // providers:[OrderService,{provide:APP_GUARD,useClass:JwtAuthGuard}],
    providers:[OrderService,],
    controllers:[OrderController],
    exports:[OrderService]

})
export class OrderModule {}

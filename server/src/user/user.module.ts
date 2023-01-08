
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
// import { UserController } from './user.controller';
import { UserController } from './user.controller';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    providers:[UserService],
    exports:[UserService],
    controllers: [UserController]
})
export class UserModule {}

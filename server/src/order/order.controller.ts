import { Body, Controller, Get, Param, Post, Res, UseGuards, HttpStatus, Delete } from '@nestjs/common';
import { id } from 'aws-sdk/clients/datapipeline';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/emuns/role.enum';
import { OrderService } from './order.service';
import { OrderDto } from '../dto/orderDto';
import { BookService } from '../book/book.service';
import { DeleteOrderDto } from '../dto/deleteOrderDto';
import { Response } from 'express';

@Controller('order')
export class OrderController {
    constructor(private orderService:OrderService,private bookService:BookService){}
    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
    addOrder(@Res() res, @Body() order:OrderDto){
        console.log(order)
        this.orderService.addToOrder(order)
        .then(data=>{
            return this.bookService.updateAmount(order.bookId,order.amount)
        })
        .then(data=>{
            return res.status(HttpStatus.OK).json({
                ...data,
                message:["Đặt sách thành công"]
            })
        })
        .catch(err=>{
            console.log(err)
            return res.status(HttpStatus.BAD_REQUEST).json({
                ...err,
                message:["Đặt sách thất bại"]
            })
        })
    }
    @Get("/:id")
    @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
    async getOrder(@Param() param:{id}, @Res() res){
        const listBook= await this.orderService.getOrder(param.id)
        return res.status(HttpStatus.OK).json(
            listBook
        )
    }
    @UseGuards(JwtAuthGuard,RoleGuard(Role.User||Role.Admin))
    @Delete("/:id")
    async deleteOrder(@Res() res,@Param() param:{id}){
        console.log(param.id)
        this.orderService.deleteOrder(param.id)
        // .then(data=>{
        //     console.log(data)
        //     return this.bookService.updateAmount(order.bookId,(0-order.amount))
        // })
        .then(data=>{
            return res.status(200).json({
                ...data,
                message:["Hủy đặt sách thành công"]
            })
        })
        .catch(err=>{
            console.log(err)
            return res.status(HttpStatus.BAD_REQUEST).json({
                ...err,
                message:['Xóa đặt sách thất bại!']
            })
        })
    }

}

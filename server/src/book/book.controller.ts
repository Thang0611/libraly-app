import {
  Controller,
  Get,
  Body,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from '../dto/bookDto';
import { Param, Post, Put } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Req,
  UploadedFile,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { Express } from 'express';
import { Id } from 'aws-sdk/clients/kinesisanalytics';

import { Role } from 'src/auth/emuns/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import RoleGuard from 'src/auth/guards/role.guard';
import { HttpException } from '@nestjs/common';
import { AddReviewDto } from 'src/dto/addReviewDto';
// import { ImageService } from '../oder/cart/image/image.service';
// import RoleGuard from 'src/auth/guards/role.guard';
// import RoleGuard from 'src/auth/guards/role.guard';
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  // @UseGuards(RoleGuard(Role.user))
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(RoleGuard(Role.Admin))

  @Get('/:id')
  detailBook(@Param() params: { id }) {
    return this.bookService.detailBook(params.id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  addBook(
    @Body() bookDto:BookDto,
    @Res() res,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(bookDto)
    console.log(image)
    if (!image) {
      return res.status(400).json({
        message: ['Ảnh không được để trống'],
        success: false,
      });
    }
    console.log(image)
    const newBook = this.bookService.create(
      bookDto,
      image.buffer,
      image.originalname,
    );
    newBook
      .then((data) => {
        return res.status(HttpStatus.OK).json({
          ...data,
          message: ['Thêm sách thành công'],
          success: true,
        });
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({
          message: ['Thêm sách thất bại'],
          success: false,
        });
      });
  }

  @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateBook(
    @Param() params: { id: number },
    @Body() bookDto: BookDto,
    @Res() res,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      const book = this.bookService.updateBookAndImage(
        params.id,
        bookDto,  
        image.buffer,
        image.originalname,
      );
      book
      .then((data) => {
        return res.status(HttpStatus.OK).json({
          message: ['Update sách thành công'],
          success: true,
        });
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({
          message: ['Update sách thất bại'],
          success: false,
        });
      });
    }
    else {
      const book=this.bookService.updateBook(params.id, bookDto)
    book
      .then((data) => {
        console.log(data)
        return res.status(HttpStatus.OK).json({
          message: ['Update sách thành công'],
          success: true,
        });
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({
          message: ['Update sách thất bại'],
          success: false,
        });
      });
    }
  }
  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  async deleteBook(@Param() params: { id: string }, @Res() res) {
    console.log(params.id)
    const bookDelete = this.bookService.deleteBook(params.id);
    bookDelete
      .then((data) => {
        console.log(data);
        return res.status(HttpStatus.OK).json({
          ...data,
          message: ['Delete sách thành công'],
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          err,
        });
      });
  }
  // @Put('/image/:id')
  // @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  // @UseInterceptors(FileInterceptor('image'))
  // async updateImage(
  //   @Req() request,
  //   @Param() params: { id },
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.bookService.updateImage(
  //     params.id,
  //     file.buffer,
  //     file.originalname,
  //   );
  // }

  // @Post('/image')
  // @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  // @UseInterceptors(FileInterceptor('image'))
  // async addImage(@Req() request, @UploadedFile() file: Express.Multer.File) {
  //   const book = this.bookService.addImage(file.buffer, file.originalname);
  //   return book;
  // }
  // @Delete('/image/:id')
  // @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  // deleteImage(@Param() params: { id }) {
  //   return this.bookService.deleteImage(params.id);
  // }

  @Post('/review/:id')
  @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
  addEvaluate(@Param() param:{id},@Res() res ,@Body() evaluate:AddReviewDto){
    console.log(param.id)
    const newEvaluate = this.bookService.addReview(param.id,evaluate);
    newEvaluate
    .then((data) => {
      return res.status(HttpStatus.OK).json({
        ...data,
        message: ['Thêm đánh giá thành công'],
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        ...err,
        message: ['Thêm đánh giá Thất bại'],
      });                                         
    });
  }

}


import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import { ImageService } from "./image.service";


@Controller('/v1/api/fileUpload')
export class ImageController {
    constructor(private ImageService: ImageService) {}

    // @Post()
    // @UseInterceptors(FileInterceptor('file'))
    // async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    //     const uploadedFile = await this.ImageService.uploadFile(file.buffer, file.originalname);
    //     console.log('File has been uploaded,', uploadedFile.fileName);        
    // }

}

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
// import { FileEntity, Prisma } from "@prisma/client";
import { S3 } from "aws-sdk";
// import { PrismaService } from "src/common/prisma.service";
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ImageEntity } from './ImageEntity';
import * as dotenv from 'dotenv' 
import { imageDto } from '../dto/imageDto';
import { Id } from 'aws-sdk/clients/kinesisanalytics';
dotenv.config()


@Injectable()
export class ImageService {
    
    constructor(
        @InjectRepository(ImageEntity)
        private readonly  imgRepository: Repository<ImageEntity>,)
        // private readonly configService: ConfigService)
        {}
    
        async uploadPublicFile(dataBuffer: Buffer, filename: string) {
          console.log(dataBuffer)
          console.log(filename)
            const s3 = new S3();
            console.log(process.env.AWS_PUBLIC_BUCKET_NAME)
            const uploadResult = await s3.upload({
              Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,//this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
              Body: dataBuffer,
              Key: `${uuid()}-${filename}`,
              ContentType: 'image/png'
            })
              .promise();
         
            const newFile = this.imgRepository.create({
              key: uploadResult.Key,
              url: uploadResult.Location,
            });
            // await this.imgRepository.save(newFile);
            // console.log(newFile)
            return newFile;
          }

          
          async deletePublicFile(id: string) {
            const image = await this.imgRepository.findOne({where:{id}});
            const s3 = new S3();
             await s3.deleteObject({
              Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
              Key: image.key,
            }).promise().catch(err=>{
              console.log('Xóa sách trong cloud s3 aws thất bại')
            });
            await this.imgRepository.delete(id);
          }

          async deleteImg(id:string){
            return this.imgRepository.delete(id)
          }
          async updateImg(id:string,image){
            return this.imgRepository.update({id:id},image)
          }
          async createImg(imageDto:imageDto){
            const image= this.imgRepository.save(imageDto);
            console.log(image)
            return image
          }
          async findById(id){
            return await this.imgRepository.findOne({where:{id:id}})
          }
    // async uploadFile(dataBuffer: Buffer, fileName: string) {
    //     const s3 = new S3();
    //     const uploadResult = await s3.upload({
    //         Bucket: this.configService.get('AWS_BUCKET_NAME'),
    //         Body: dataBuffer,
    //         Key: `${uuid()}-${fileName}`,
    //     }).promise();

    //     const fileStorageInDB = ({
    //         fileName: fileName,
    //         fileUrl: uploadResult.Location,
    //         key: uploadResult.Key,
    //     });

    //     const filestored = await this.prismaService.fileEntity.create({
    //         data: fileStorageInDB
    //     });

    //     return filestored;
    // }
}

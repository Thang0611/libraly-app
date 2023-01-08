import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { loginDto } from 'src/dto/loginDto';
import { registerDto } from 'src/dto/registerDto';
import { comparePassword, hasPassword } from 'src/shared/utils';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
//   constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }
constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
      ) {}

  async addUser(registerDto: registerDto) {
    if(registerDto.password!==registerDto.passwordcf){
      throw new HttpException('mat khau khong trung',400);
    } 
    console.log('1')
    const checkUser=await this.usersRepository.findOne({where:{username: registerDto.username}});
    console.log(checkUser)
    if (checkUser){
        throw new ConflictException(`Tên đăng nhập ${registerDto.username} đã tồn tại`);
    }
    const newUser = await this.usersRepository.create(registerDto);
    console.log('3')
    newUser.password = await hasPassword(newUser.password)
    return newUser.save();
  }

  async findUser(username): Promise<UserEntity | undefined> {
    const user = await this.usersRepository.findOne({where:{username: username}});
    return user;
  }
  async findUserById(id): Promise<UserEntity | undefined> {
    const user =  this.usersRepository.findOne({where:{id: id}});
    return user;
  }
  async findAllUser() {
    const user = await this.usersRepository.find();
    return user;
  }

//   async login(loginDto:loginDto):Promise<UserEntity|any>{
//     const user =await this.usersRepository.findOne({where:{username:loginDto.username}})
    
//     if(user){
//         const result = comparePassword(loginDto.password,user.password)
//         console.log(result)
//         if (result){
//             return user
//         }
        
//     }
//     else return
    
//     }






// async checkExitsUser(registerDto:registerDto):Promise<UserDto>{
//     return await this.usersRepository.findOne({where:{username:registerDto.username}})
// }



// async register(registerDto:registerDto){
// const newUser = await this.usersRepository.findOne({where:{username:registerDto.username}})
// if (newUser){
//     console.log('username đã tồn tại ')
//     return {
//         success:false,
//         msg:"username đã tồn tại "
//     }
// }
// else {
//     if(!(registerDto.password===registerDto.passwordcf)){
//         console.log('Password không khớp ')
//         return{
//             success:false,
//             msg:'Password không khớp !'
//         }
//     }
//     else {
//         const password = await hasPassword(registerDto.password)
//         const newUser =this.usersRepository.create({...registerDto,password})
//         console.log(newUser)
//         const saveUser= await this.usersRepository.save(newUser)
//         if (saveUser){
//             console.log('Đăng kí thành công')
//             return {

//                 success:true,
//                 msg:'Đăng kí thành công'
//             }
//         }
//         else{
//             throw new BadRequestException('Something bad happened')
//         }
//     }
//     }
    
// }



}



    
            
            

    



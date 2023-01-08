import { BaseEntity, BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn, JoinTable, ManyToMany, CreateDateColumn } from 'typeorm';
import * as bcrypt from'bcryptjs';
import { Role } from "src/auth/emuns/role.enum";
import { ReviewEntity } from '../review/review.entity';
import { OrderEntity } from "src/order/order.entity";
import { BookDto } from '../dto/bookDto';
import { BookEntity } from '../book/book.entity';

@Entity('users')
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    username : string;
    @Column()
    password:string;
    @Column()
    fullname:string;
    @Column()
    email:string;
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    // @OneToOne(
    //   ()=>CartEntity, 
    //   cart=>cart.user
    // )
    // cart:CartEntity

    @OneToMany(
      ()=>OrderEntity,
      (order:OrderEntity)=>order.user,
      {
          nullable:true,
          onDelete:'CASCADE',  
      }
  )
  // @JoinColumn()
  order:OrderEntity[]
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
        
      })
      public role: Role
      @OneToMany(
        () => ReviewEntity,
        (review:ReviewEntity)=>review.user

      )
      review: ReviewEntity[];

      // @ManyToMany(()=>BookDto,(book:BookEntity)=>book.user)
      // @JoinTable({ 
      //   name: 'order_user',
      //   joinColumn: { name: 'userId' },
      //   inverseJoinColumn: { name: 'bookId' }
      // })
      // book: BookEntity[]


    // @OneToOne(
    //   ()=>ReviewEntity,
    // )



    // @OneToMany(
    //   ()=>OrderEntity,
    //   order=>order.user
    //   // lỗi maximum
    //   // {
    //   //     eager:true   
    //   // }
    // )
    // @JoinColumn()
    // order:OrderEntity[]



    // @BeforeInsert()
    // async hashPassword(){
    //     this.password= await bcrypt.hash(this.password,10)
    // }
    // async validatePassword(password:string):Promise<boolean>{
    //     return bcrypt.compare(password,this.password);
    // }
   
}
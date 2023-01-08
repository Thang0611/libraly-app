import { Transform } from 'class-transformer';
import moment from 'moment';
// import { CartItemEntity } from 'src/cart-item/cart-item.entity';
// import { CartEntity } from 'src/cart/cart.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, OneToOne, OneToMany, ManyToMany, RelationId, ManyToOne, CreateDateColumn } from 'typeorm';
import { ImageEntity } from '../image/ImageEntity';
import { OrderEntity } from 'src/order/order.entity';
import { UserEntity } from 'src/user/user.entity';
@Entity('books')
export class BookEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    title:string;
    @Column()
    author:string;
    @Column()
    category:string;
    @Column()
    publishingCompany:string;
    @Column('date') 
    date:Date; 
    @Column({})
    numOfPage:number;
    @Column('longtext')
    decription:string;
    @Column()
    amount:number
    
    @OneToOne(
      () => ImageEntity,
      // (image) => image.book,
      {
        eager: true,
        nullable: true
      }
    )
    // 444223388 pham tuan hung acb nd :0987027740 nguyen huu thang
    @JoinColumn()
    public image: ImageEntity;
    // @RelationId((book: BookEntity) => book.reviews)
    
    @OneToMany(
      ()=>ReviewEntity,
      (evaluate)=>evaluate.book,
      {
        // eager:true,
        cascade: true,
        onDelete:"CASCADE"

      }
    
    )
    // @JoinColumn()
    public reviews?:ReviewEntity[];
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    // @ManyToMany(()=>UserEntity,(user:UserEntity)=>user.book)
    // user: UserEntity[]

    // @ManyToMany(
    //   ()=>OrderEntity,
    //   (order)=>order.book,
    //   {
    //     cascade: true,
    //     nullable:true,
    //     onDelete:"CASCADE"
    //   }
    // )
    // // @JoinColumn()
    // order:OrderEntity[]

        @OneToMany(
      ()=>OrderEntity,
      (order)=>order.book,
      {
        cascade: true,
        nullable:true,
        onDelete:"CASCADE"
      }
    )
    // @JoinColumn()
      order:OrderEntity;

    // @ManyToMany(
    //   ()=>CartEntity,
    //   cart=>cart.books
    //   )
    //   cart:CartEntity[]
    // @OneToMany(
    //   ()=>CartItemEntity,
    //   cartItem=>cartItem.book
    // )
    // cartItem:CartItemEntity[]
}
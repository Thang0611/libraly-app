import { BookEntity } from "src/book/book.entity";
import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToMany, ManyToOne, JoinTable, CreateDateColumn } from 'typeorm';

@Entity("orders")
export class OrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column()
    amount:number;
    @ManyToOne(
        ()=>UserEntity,
        (user:UserEntity)=>user.order,
        {
            eager:true,
            nullable:true,
            onDelete:"CASCADE" 
        }
    )
    @JoinColumn()
    user:UserEntity
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;
    // @ManyToMany(
    //     ()=>BookEntity,
    //     (book)=>book.order,
    //     {
    //         eager:true,
    //         nullable:true  
    //     }
    // )
    // @JoinTable()
    // book:BookEntity;

        @ManyToOne(
        ()=>BookEntity,
        (book)=>book.order,
        {
            eager:true,
            nullable:true, 
            // createForeignKeyConstraints: false,
            onDelete:"CASCADE"
        }
        )
        @JoinColumn()    
        book:BookEntity;

}
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from '../book/book.entity';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
 
  @Column()
  public url: string;
 
  @Column()
  public key: string;
  @OneToOne(
      () => BookEntity,
      (book)=>book.image,
      // {
      //   eager: true,
      //   nullable: true
      // }
    )
    book:BookEntity
}
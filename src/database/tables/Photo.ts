import {Table, Column, PrimaryGeneratedColumn} from "../../../lib/typeorm/index";

@Table()
export class Photo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: "500" })
  name: string;

  @Column("text")
  description: string;

  @Column()
  fileName: string;

  @Column("int")
  views: number;

  @Column()
  isPublished: boolean;
}
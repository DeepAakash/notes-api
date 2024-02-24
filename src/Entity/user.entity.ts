import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NoteEntity } from "./note.entity";

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(() => NoteEntity, note => note.user)
    notes: NoteEntity[];
}
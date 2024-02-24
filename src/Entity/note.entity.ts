import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from "./user.entity";

@Entity('notes')
export class NoteEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    desc: string;
    
    @Column()
    status: NoteStatus;

    @ManyToOne(() => UserEntity, (user) => user.notes)
    user: UserEntity

    @Column()
    userId: number;
}

export enum NoteStatus{
    CRITICAL='CRITICAL',
    MODERATE='MODERATE',
    BASIC='BASIC'
}
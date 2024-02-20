import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}

export enum NoteStatus{
    CRITICAL='CRITICAL',
    MODERATE='MODERATE',
    BASIC='BASIC'
}
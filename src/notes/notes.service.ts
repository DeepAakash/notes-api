import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDTO } from 'src/DTO/create-note.dto';
import { NoteStatus, NoteEntity } from 'src/Entity/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
    constructor(@InjectRepository(NoteEntity) private repo: Repository<NoteEntity>){

    }

    async getAllNotes(): Promise <NoteEntity[]>{
        return await this.repo.find();
    }

    async createNewNote(createNoteDTO: CreateNoteDTO): Promise<NoteEntity>{
        const note: NoteEntity = new NoteEntity();    
        const{title, desc}=createNoteDTO
        note.title=title;
        note.desc=desc;
        note.status=NoteStatus.BASIC;

        this.repo.create(note);
        try{
            return await this.repo.save(note);
        }catch(err){
            throw new InternalServerErrorException('Something went wrong. Note not created');
        }
    }

    async update(id: number, status: NoteStatus): Promise<NoteEntity>{
        try{
            await this.repo.update({id}, {status});
            return this.repo.findOneBy({id:id});
        }catch(err){
            throw new InternalServerErrorException('Oops! Something went wrong.');
        }
    }

    async delete(id: number){
        try{
            return await this.repo.delete({id});
        }catch(err){
            throw new InternalServerErrorException('Oops! Something went wrong.');
        }
    }
}

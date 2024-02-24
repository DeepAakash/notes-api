import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDTO } from 'src/DTO/create-note.dto';
import { NoteStatus, NoteEntity } from 'src/Entity/note.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
    constructor(@InjectRepository(NoteEntity) private repo: Repository<NoteEntity>){

    }

    async getAllNotes(user: UserEntity): Promise <NoteEntity[]>{
        const query=await this.repo.createQueryBuilder('notes');
        query.where(`notes.userId = :userId`, {userId: user.id});
        try{
            return await query.getMany();
        }catch(err){
            throw new NotFoundException("Oops! No note found.");
        }
    }

    async createNewNote(createNoteDTO: CreateNoteDTO, user: UserEntity): Promise<NoteEntity>{
        const note: NoteEntity = new NoteEntity();    
        const{title, desc}=createNoteDTO
        note.title=title;
        note.desc=desc;
        note.status=NoteStatus.BASIC;
        note.userId=user.id;

        this.repo.create(note);
        try{
            return await this.repo.save(note);
        }catch(err){
            throw new InternalServerErrorException('Something went wrong. Note not created');
        }
    }

    async update(id: number, status: NoteStatus, user: UserEntity): Promise<NoteEntity>{
        try{
            await this.repo.update({id, userId: user.id}, {status});
            return this.repo.findOneBy({id:id});
        }catch(err){
            throw new InternalServerErrorException('Oops! Something went wrong.');
        }
    }

    async delete(id: number, user: UserEntity){
        const res=await this.repo.delete({id, userId: user.id});
        if(res.affected===0){
            throw new NotFoundException("Note not deleted!");
        }else{
            return {success: true};
        }
    }
}

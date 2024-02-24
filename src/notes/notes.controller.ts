import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteStatus, NoteEntity } from 'src/Entity/note.entity';
import { CreateNoteDTO } from 'src/DTO/create-note.dto';
import { NoteStatusValidationPipe } from 'src/pipes/NoteStatusValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/Entity/user.entity';
import { User } from 'src/auth/user.decorator';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
    constructor(private notesService: NotesService){}

    @Get()
    getAllNotes(@User() user: UserEntity): Promise<NoteEntity[]>{
        // console.log(this.notesService.getAllNotes());
        return this.notesService.getAllNotes(user);
    }

    @Post()
    createNewNote(
        @Body(ValidationPipe) data: CreateNoteDTO,
        @User() user: UserEntity): Promise<NoteEntity>{
        return this.notesService.createNewNote(data, user);
    }

    @Patch(':id')
    updateNote(
        @Body('status', NoteStatusValidationPipe)status: NoteStatus,
        @Param('id')id: number,
        @User() user: UserEntity): Promise<NoteEntity>{
        return this.notesService.update(id, status, user);
    }

    @Delete(':id')
    deleteNote(
        @Param('id')id: number,
        @User() user: UserEntity){
        return this.notesService.delete(id, user);
    }
}

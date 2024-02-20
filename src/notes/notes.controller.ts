import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteStatus, NoteEntity } from 'src/Entity/note.entity';
import { CreateNoteDTO } from 'src/DTO/create-note.dto';
import { NoteStatusValidationPipe } from 'src/pipes/NoteStatusValidation.pipe';

@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService){}

    @Get()
    getAllNotes(): Promise<NoteEntity[]>{
        // console.log(this.notesService.getAllNotes());
        return this.notesService.getAllNotes();
    }

    @Post()
    createNewNote(@Body(ValidationPipe) data: CreateNoteDTO): Promise<NoteEntity>{
        return this.notesService.createNewNote(data);
    }

    @Patch(':id')
    updateNote(
        @Body('status', NoteStatusValidationPipe)status: NoteStatus,
        @Param('id')id: number): Promise<NoteEntity>{
        return this.notesService.update(id, status);
    }

    @Delete(':id')
    deleteNote(@Param('id')id: number){
        return this.notesService.delete(id);
    }
}

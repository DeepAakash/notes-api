import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/Entity/note.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteEntity]),
    AuthModule],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}

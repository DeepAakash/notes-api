import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateNoteDTO{
    @IsNotEmpty()
    @MaxLength(25, {message: 'Oops! Maximum length is 25 characters.'})
    title: string;
    
    @IsNotEmpty()
    desc: string;
}
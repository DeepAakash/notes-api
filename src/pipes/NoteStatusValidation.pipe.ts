import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { NoteStatus } from "src/Entity/note.entity";

export class NoteStatusValidationPipe implements PipeTransform{
    readonly allowedStatus= [NoteStatus.CRITICAL, NoteStatus.MODERATE, NoteStatus.BASIC];
    private isStatusValid(status: any): boolean{
        const index:number=this.allowedStatus.indexOf(status);
        return index!=-1;    
    }
    transform(value: any, metadata: ArgumentMetadata) {
        value=value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`Oops! ${value} is an invalid status.`);
        }
        return value;   
    }
} 
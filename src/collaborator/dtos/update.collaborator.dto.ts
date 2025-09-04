import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Multer } from "multer";

export class UpdateCollaboratorDto {
    
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsOptional()
    title?: string;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsString()
    @IsNotEmpty()
    image?: string;
}
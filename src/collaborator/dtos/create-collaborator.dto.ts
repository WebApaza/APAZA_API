import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCollaboratorDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    image?: string;
}
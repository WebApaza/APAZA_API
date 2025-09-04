import { Controller, Body, ValidationPipe, Post, Get, Put, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { Response } from 'src/domain/response';
import { CreateCollaboratorDto } from './dtos/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dtos/update.collaborator.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageValidator } from 'src/validators/validators';

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile(imageValidator()) img: Express.Multer.File,
    @Body(new ValidationPipe()) collaborator: CreateCollaboratorDto,
  ): Promise<Response> {
    return this.collaboratorService.create(collaborator, img);
  }
  
  @Put()
  @UseInterceptors(FileInterceptor('new-image')) 
  async update(
    @Body(new ValidationPipe()) collaborator: UpdateCollaboratorDto,
    @UploadedFile(imageValidator()) img?: Express.Multer.File
  ): Promise<Response> {
    return this.collaboratorService.update(collaborator,img);
  }


  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Response> {
    return this.collaboratorService.delete(id);
  }

  @Get()
  async findAll(): Promise<Response> {
    return this.collaboratorService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Response> {
    return this.collaboratorService.findById(id);
  }
}

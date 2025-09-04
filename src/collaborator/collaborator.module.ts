import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collaborator, CollaboratorSchema } from './schema/Collaborators.schema';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { ImageService } from 'src/logic/storage.logic';
import { FirebaseService } from 'src/data/storage';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Collaborator.name,
    schema: CollaboratorSchema,
  }])],
  providers: [CollaboratorService,ImageService,FirebaseService],
  controllers: [CollaboratorController]
})
export class CollaboratorModule { }
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collaborator } from './schema/Collaborators.schema';
import { Model } from 'mongoose';
import { BAD_REQUEST, CREATED, OK } from 'src/constants/code.constant';
import { Response } from 'src/domain/response';
import { CreateCollaboratorDto } from './dtos/create-collaborator.dto';
import { returnErrorMessage, returnInfoMessage, returnSuccessMessage } from 'src/logic/response.logic';
import { UpdateCollaboratorDto } from './dtos/update.collaborator.dto';
import { Message } from 'src/constants/message.constant';
import { ImageService } from 'src/logic/storage.logic';
import { isEmpty } from 'class-validator';

@Injectable()
export class CollaboratorService {
  constructor(@InjectModel(Collaborator.name) private readonly collaboratorModel: Model<Collaborator>,
    private readonly storageService: ImageService) { }

  async create(collaborator: CreateCollaboratorDto, img: Express.Multer.File): Promise<Response> {
    const result = await this.storageService.uploadImage(img);
    collaborator.image = result;
    const createdCollaborator = new this.collaboratorModel(collaborator);
    const response = createdCollaborator.save().then((response) => {
      return returnSuccessMessage([Message.CREATED_MESSAGE], CREATED, response);
    }).catch((error) => {
      return returnErrorMessage([Message.ERROR_CREATED_MESSAGE], BAD_REQUEST, error);
    });

    return response;
  }

  async update(collaborator: UpdateCollaboratorDto, img?: Express.Multer.File): Promise<Response> {
    if (!isEmpty(img)) {
      await this.storageService.deleteImage(collaborator.image);
      const result = await this.storageService.uploadImage(img);
      collaborator.image = result;
    }

    const response = this.collaboratorModel.findByIdAndUpdate(collaborator.id, collaborator, { new: true }).then((response) => {
      if (!response) {
        return returnInfoMessage([Message.ERROR_FOUND_MESSAGE], BAD_REQUEST);
      }
      return returnSuccessMessage([Message.UPDATED_MESSAGE], OK, response);
    }).catch((error) => {
      return returnErrorMessage([Message.ERROR_UPDATED_MESSAGE], BAD_REQUEST, error);
    });

    return response;
  }

  async delete(id: string): Promise<Response> {
    try {
      const response = await this.collaboratorModel.findByIdAndDelete(id);
  
      if (!response) {
        return returnInfoMessage([Message.ERROR_FOUND_MESSAGE], BAD_REQUEST);
      }
  
      try {
        await this.storageService.deleteImage(response.image);
      } catch (error) {
        return returnErrorMessage([Message.ERROR_DELETED_MESSAGE], BAD_REQUEST, error);
      }
  
      return returnInfoMessage([Message.DELETED_MESSAGE], OK);
    } catch (error) {
      return returnErrorMessage([Message.ERROR_DELETED_MESSAGE], BAD_REQUEST, error);
    }
  }
  

  async findAll(): Promise<Response> {
    return this.collaboratorModel.find().then((response) => {
      return returnSuccessMessage([Message.FOUND_MESSAGE], OK, response);
    }).catch((error) => {
      return returnErrorMessage([Message.ERROR_FOUND_MESSAGE], BAD_REQUEST, error);
    });
  }

  async findById(id: string): Promise<Response> {
    return this.collaboratorModel.findById(id).then((response) => {
      if (!response) {
        return returnInfoMessage([Message.NOT_FOUND_MESSAGE], OK);
      }
      return returnSuccessMessage([Message.FOUND_MESSAGE], OK, response);
    }).catch((error) => {
      return returnErrorMessage([Message.ERROR_FOUND_MESSAGE], BAD_REQUEST, error);
    });
  }
}

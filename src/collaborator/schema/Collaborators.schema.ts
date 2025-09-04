import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Collaborator {
    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    description: string;

    @Prop({default: 'test'})
    image: string;
}

export const CollaboratorSchema = SchemaFactory.createForClass(Collaborator);
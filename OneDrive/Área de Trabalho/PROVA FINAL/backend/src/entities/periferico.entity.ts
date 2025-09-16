import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PerifericoDocument = Periferico & Document;

@Schema({ collection: 'perifericos' })
export class Periferico {
  @Prop({ required: true })
  nome: string;

  @Prop({ type: Types.ObjectId, ref: 'Computador', required: true })
  computadorId: Types.ObjectId;
}

export const PerifericoSchema = SchemaFactory.createForClass(Periferico);

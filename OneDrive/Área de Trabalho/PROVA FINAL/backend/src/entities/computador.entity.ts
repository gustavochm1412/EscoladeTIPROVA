import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ComputadorDocument = Computador & Document;

@Schema({ collection: 'computadores' })
export class Computador {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cor: string;

  @Prop({ required: true })
  dataFabricacao: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Periferico' }] })
  perifericos: Types.ObjectId[];
}

export const ComputadorSchema = SchemaFactory.createForClass(Computador);

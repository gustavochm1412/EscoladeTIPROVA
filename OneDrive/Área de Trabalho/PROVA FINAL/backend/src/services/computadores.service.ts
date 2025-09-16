import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Computador, ComputadorDocument } from '../entities/computador.entity';
import { Periferico, PerifericoDocument } from '../entities/periferico.entity';
import { CreateComputadorDto, UpdateComputadorDto, CreatePerifericoDto, UpdatePerifericoDto } from '../dto/computador.dto';

@Injectable()
export class ComputadoresService {
  constructor(
    @InjectModel(Computador.name)
    private computadorModel: Model<ComputadorDocument>,
    @InjectModel(Periferico.name)
    private perifericoModel: Model<PerifericoDocument>,
  ) {}

  async findAll(): Promise<Computador[]> {
    return this.computadorModel.find().populate('perifericos').exec();
  }

  async findOne(id: string): Promise<Computador> {
    const computador = await this.computadorModel.findById(id).populate('perifericos').exec();
    if (!computador) {
      throw new NotFoundException(`Computador com ID ${id} não encontrado`);
    }
    return computador;
  }

  async create(createComputadorDto: CreateComputadorDto): Promise<Computador> {
    const { perifericos, ...computadorData } = createComputadorDto;
    
    // Criar computador simples primeiro
    const computador = new this.computadorModel({
      nome: computadorData.nome,
      cor: computadorData.cor,
      dataFabricacao: computadorData.dataFabricacao,
      perifericos: []
    });
    
    const savedComputador = await computador.save();
    return savedComputador;
  }

  async update(id: string, updateComputadorDto: UpdateComputadorDto): Promise<Computador> {
    const computador = await this.computadorModel.findByIdAndUpdate(
      id,
      updateComputadorDto,
      { new: true }
    ).populate('perifericos').exec();
    
    if (!computador) {
      throw new NotFoundException(`Computador com ID ${id} não encontrado`);
    }
    
    return computador;
  }

  async remove(id: string): Promise<void> {
    // Remover periféricos primeiro
    await this.perifericoModel.deleteMany({ computadorId: new Types.ObjectId(id) });
    
    // Remover computador
    const result = await this.computadorModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Computador com ID ${id} não encontrado`);
    }
  }

  async addPeriferico(computadorId: string, createPerifericoDto: CreatePerifericoDto): Promise<Periferico> {
    const computador = await this.findOne(computadorId);
    const periferico = new this.perifericoModel({
      ...createPerifericoDto,
      computadorId: new Types.ObjectId(computadorId),
    });
    const savedPeriferico = await periferico.save();
    
    // Atualizar o computador com a referência do periférico
    await this.computadorModel.findByIdAndUpdate(
      computadorId,
      { $push: { perifericos: savedPeriferico._id } }
    );
    
    return savedPeriferico;
  }

  async updatePeriferico(perifericoId: string, updatePerifericoDto: UpdatePerifericoDto): Promise<Periferico> {
    const periferico = await this.perifericoModel.findByIdAndUpdate(
      perifericoId,
      updatePerifericoDto,
      { new: true }
    ).exec();
    
    if (!periferico) {
      throw new NotFoundException(`Periférico com ID ${perifericoId} não encontrado`);
    }
    
    return periferico;
  }

  async removePeriferico(perifericoId: string): Promise<void> {
    const result = await this.perifericoModel.findByIdAndDelete(perifericoId).exec();
    if (!result) {
      throw new NotFoundException(`Periférico com ID ${perifericoId} não encontrado`);
    }
  }
}

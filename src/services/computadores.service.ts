import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Computador } from '../entities/computador.entity';
import { Periferico } from '../entities/periferico.entity';

@Injectable()
export class ComputadoresService {
  constructor(
    @InjectRepository(Computador)
    private computadorRepository: Repository<Computador>,
    @InjectRepository(Periferico)
    private perifericoRepository: Repository<Periferico>,
  ) {}

  async findAll(): Promise<Computador[]> {
    return this.computadorRepository.find({
      relations: ['perifericos'],
    });
  }

  async findOne(id: number): Promise<Computador> {
    const computador = await this.computadorRepository.findOne({
      where: { id },
      relations: ['perifericos'],
    });
    if (!computador) {
      throw new NotFoundException(`Computador com ID ${id} não encontrado`);
    }
    return computador;
  }

  async create(createComputadorDto: { nome: string; cor: string; dataFabricacao: number }): Promise<Computador> {
    const computador = this.computadorRepository.create(createComputadorDto);
    return this.computadorRepository.save(computador);
  }

  async update(id: number, updateComputadorDto: { nome?: string; cor?: string; dataFabricacao?: number }): Promise<Computador> {
    const computador = await this.findOne(id);
    Object.assign(computador, updateComputadorDto);
    return this.computadorRepository.save(computador);
  }

  async remove(id: number): Promise<void> {
    const computador = await this.findOne(id);
    await this.computadorRepository.remove(computador);
  }

  async addPeriferico(computadorId: number, createPerifericoDto: { nome: string }): Promise<Periferico> {
    const computador = await this.findOne(computadorId);
    const periferico = this.perifericoRepository.create({
      ...createPerifericoDto,
      computadorId,
    });
    return this.perifericoRepository.save(periferico);
  }

  async removePeriferico(perifericoId: number): Promise<void> {
    const periferico = await this.perifericoRepository.findOne({
      where: { id: perifericoId },
    });
    if (!periferico) {
      throw new NotFoundException(`Periférico com ID ${perifericoId} não encontrado`);
    }
    await this.perifericoRepository.remove(periferico);
  }
}

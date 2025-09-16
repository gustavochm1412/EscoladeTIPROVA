import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ComputadoresService } from '../services/computadores.service';
import { Computador } from '../entities/computador.entity';
import { Periferico } from '../entities/periferico.entity';

@Controller('computadores')
export class ComputadoresController {
  constructor(private readonly computadoresService: ComputadoresService) {}

  @Get()
  async findAll(): Promise<Computador[]> {
    return this.computadoresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Computador> {
    return this.computadoresService.findOne(id);
  }

  @Post()
  async create(@Body() createComputadorDto: { nome: string; cor: string; dataFabricacao: number }): Promise<Computador> {
    return this.computadoresService.create(createComputadorDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComputadorDto: { nome?: string; cor?: string; dataFabricacao?: number },
  ): Promise<Computador> {
    return this.computadoresService.update(id, updateComputadorDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.computadoresService.remove(id);
    return { message: 'maquina removida com sucesso' };
  }

  @Post(':id/perifericos')
  async addPeriferico(
    @Param('id', ParseIntPipe) computadorId: number,
    @Body() createPerifericoDto: { nome: string },
  ): Promise<Periferico> {
    return this.computadoresService.addPeriferico(computadorId, createPerifericoDto);
  }

  @Delete(':id/perifericos/:perifericoId')
  async removePeriferico(
    @Param('perifericoId', ParseIntPipe) perifericoId: number,
  ): Promise<{ message: string }> {
    await this.computadoresService.removePeriferico(perifericoId);
    return { message: 'periferico removido com sucesso' };
  }
}

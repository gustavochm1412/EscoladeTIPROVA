import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { ComputadoresService } from '../services/computadores.service';
import { Computador } from '../entities/computador.entity';
import { Periferico } from '../entities/periferico.entity';
import { CreateComputadorDto, UpdateComputadorDto, CreatePerifericoDto, UpdatePerifericoDto } from '../dto/computador.dto';

@Controller('computadores')
export class ComputadoresController {
  constructor(private readonly computadoresService: ComputadoresService) {}

  @Get()
  async findAll(): Promise<Computador[]> {
    return this.computadoresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Computador> {
    return this.computadoresService.findOne(id);
  }

  @Post()
  async create(@Body() createComputadorDto: CreateComputadorDto): Promise<Computador> {
    return this.computadoresService.create(createComputadorDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateComputadorDto: UpdateComputadorDto,
  ): Promise<Computador> {
    return this.computadoresService.update(id, updateComputadorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.computadoresService.remove(id);
    return { message: 'Computador removido com sucesso' };
  }

  @Post(':id/perifericos')
  async addPeriferico(
    @Param('id') computadorId: string,
    @Body() createPerifericoDto: CreatePerifericoDto,
  ): Promise<Periferico> {
    return this.computadoresService.addPeriferico(computadorId, createPerifericoDto);
  }

  @Patch(':id/perifericos/:perifericoId')
  async updatePeriferico(
    @Param('perifericoId') perifericoId: string,
    @Body() updatePerifericoDto: UpdatePerifericoDto,
  ): Promise<Periferico> {
    return this.computadoresService.updatePeriferico(perifericoId, updatePerifericoDto);
  }

  @Delete(':id/perifericos/:perifericoId')
  async removePeriferico(
    @Param('perifericoId') perifericoId: string,
  ): Promise<{ message: string }> {
    await this.computadoresService.removePeriferico(perifericoId);
    return { message: 'Periférico removido com sucesso' };
  }
}

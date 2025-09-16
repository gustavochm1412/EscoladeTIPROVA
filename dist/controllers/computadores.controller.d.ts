import { ComputadoresService } from '../services/computadores.service';
import { Computador } from '../entities/computador.entity';
import { Periferico } from '../entities/periferico.entity';
export declare class ComputadoresController {
    private readonly computadoresService;
    constructor(computadoresService: ComputadoresService);
    findAll(): Promise<Computador[]>;
    findOne(id: number): Promise<Computador>;
    create(createComputadorDto: {
        nome: string;
        cor: string;
        dataFabricacao: number;
    }): Promise<Computador>;
    update(id: number, updateComputadorDto: {
        nome?: string;
        cor?: string;
        dataFabricacao?: number;
    }): Promise<Computador>;
    remove(id: number): Promise<{
        message: string;
    }>;
    addPeriferico(computadorId: number, createPerifericoDto: {
        nome: string;
    }): Promise<Periferico>;
    removePeriferico(perifericoId: number): Promise<{
        message: string;
    }>;
}

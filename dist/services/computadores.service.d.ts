import { Repository } from 'typeorm';
import { Computador } from '../entities/computador.entity';
import { Periferico } from '../entities/periferico.entity';
export declare class ComputadoresService {
    private computadorRepository;
    private perifericoRepository;
    constructor(computadorRepository: Repository<Computador>, perifericoRepository: Repository<Periferico>);
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
    remove(id: number): Promise<void>;
    addPeriferico(computadorId: number, createPerifericoDto: {
        nome: string;
    }): Promise<Periferico>;
    removePeriferico(perifericoId: number): Promise<void>;
}

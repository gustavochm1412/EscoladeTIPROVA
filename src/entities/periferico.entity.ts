import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Computador } from './computador.entity';

@Entity('perifericos')
export class Periferico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  computadorId: number;

  @ManyToOne(() => Computador, computador => computador.perifericos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'computadorId' })
  computador: Computador;
}

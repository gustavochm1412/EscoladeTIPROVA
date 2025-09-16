import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Periferico } from './periferico.entity';

@Entity('computadores')
export class Computador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cor: string;

  @Column()
  dataFabricacao: number;

  @OneToMany(() => Periferico, periferico => periferico.computador, { cascade: true })
  perifericos: Periferico[];
}

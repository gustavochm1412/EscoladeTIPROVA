import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Computador } from './entities/computador.entity';
import { Periferico } from './entities/periferico.entity';
import { ComputadoresController } from './controllers/computadores.controller';
import { ComputadoresService } from './services/computadores.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'prova_db',
      entities: [Computador, Periferico],
      synchronize: true, // Apenas para desenvolvimento
    }),
    TypeOrmModule.forFeature([Computador, Periferico]),
  ],
  controllers: [AppController, ComputadoresController],
  providers: [AppService, ComputadoresService],
})
export class AppModule {}

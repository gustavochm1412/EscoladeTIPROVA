import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Computador, ComputadorSchema } from './entities/computador.entity';
import { Periferico, PerifericoSchema } from './entities/periferico.entity';
import { ComputadoresController } from './controllers/computadores.controller';
import { ComputadoresService } from './services/computadores.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/prova_db'),
    MongooseModule.forFeature([
      { name: Computador.name, schema: ComputadorSchema },
      { name: Periferico.name, schema: PerifericoSchema },
    ]),
  ],
  controllers: [AppController, ComputadoresController],
  providers: [AppService, ComputadoresService],
})
export class AppModule {}

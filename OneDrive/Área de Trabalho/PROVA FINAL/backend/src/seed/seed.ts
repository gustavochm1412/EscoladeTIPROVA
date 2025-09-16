import { connect, disconnect, model } from 'mongoose';
import { ComputadorSchema } from '../entities/computador.entity';
import { PerifericoSchema } from '../entities/periferico.entity';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

async function seed() {
  try {
    console.log('🌱 Iniciando seed do banco de dados MongoDB...');
    
    await connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prova_db');
    console.log('✅ Conexão com MongoDB estabelecida');

    // Criar modelos
    const ComputadorModel = model('Computador', ComputadorSchema);
    const PerifericoModel = model('Periferico', PerifericoSchema);

    // Limpar dados existentes
    await PerifericoModel.deleteMany({});
    await ComputadorModel.deleteMany({});
    console.log('🧹 Dados antigos removidos');

    // Criar computadores
    const computador1 = new ComputadorModel({
      nome: 'PC Gamer Pro',
      cor: 'Preto',
      dataFabricacao: 2024,
    });

    const computador2 = new ComputadorModel({
      nome: 'Workstation Dell',
      cor: 'Prata',
      dataFabricacao: 2023,
    });

    const savedComputadores = await ComputadorModel.insertMany([computador1, computador2]);
    console.log('💻 Computadores criados:', savedComputadores.length);

    // Criar periféricos para o primeiro computador
    const periferico1 = new PerifericoModel({ nome: 'Mouse Gamer RGB', computadorId: savedComputadores[0]._id });
    const periferico2 = new PerifericoModel({ nome: 'Teclado Mecânico', computadorId: savedComputadores[0]._id });
    const periferico3 = new PerifericoModel({ nome: 'Monitor 27" 4K', computadorId: savedComputadores[0]._id });
    
    // Criar periféricos para o segundo computador
    const periferico4 = new PerifericoModel({ nome: 'Mouse Óptico', computadorId: savedComputadores[1]._id });
    const periferico5 = new PerifericoModel({ nome: 'Teclado USB', computadorId: savedComputadores[1]._id });
    const periferico6 = new PerifericoModel({ nome: 'Monitor 24" Full HD', computadorId: savedComputadores[1]._id });
    const periferico7 = new PerifericoModel({ nome: 'Webcam HD', computadorId: savedComputadores[1]._id });

    const savedPerifericos = await PerifericoModel.insertMany([
      periferico1, periferico2, periferico3, periferico4, periferico5, periferico6, periferico7
    ]);
    console.log('🖱️ Periféricos criados:', savedPerifericos.length);

    // Atualizar computadores com referências dos periféricos
    savedComputadores[0].perifericos = savedPerifericos.slice(0, 3).map(p => p._id);
    savedComputadores[1].perifericos = savedPerifericos.slice(3).map(p => p._id);
    await Promise.all(savedComputadores.map(c => c.save()));

    console.log('🎉 Seed concluído com sucesso!');
    console.log('\n📊 Resumo dos dados inseridos:');
    console.log(`- Computadores: ${savedComputadores.length}`);
    console.log(`- Periféricos: ${savedPerifericos.length}`);
    
    // Mostrar dados inseridos
    console.log('\n💻 Computadores:');
    savedComputadores.forEach(comp => {
      console.log(`  ID: ${comp._id} | Nome: ${comp.nome} | Cor: ${comp.cor} | Ano: ${comp.dataFabricacao}`);
    });

    console.log('\n🖱️ Periféricos:');
    savedPerifericos.forEach(perif => {
      console.log(`  ID: ${perif._id} | Nome: ${perif.nome} | Computador ID: ${perif.computadorId}`);
    });

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
  } finally {
    await disconnect();
    console.log('🔌 Conexão com MongoDB encerrada');
  }
}

seed();


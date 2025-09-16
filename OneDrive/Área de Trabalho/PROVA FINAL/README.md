# 🖥️ CRUD Computadores e Periféricos - NestJS + TypeORM + PostgreSQL + React

Sistema CRUD completo para gerenciar computadores e seus periféricos, desenvolvido com a stack solicitada para atividade final.

## 🚀 Stack Tecnológica

- **Backend**: NestJS + TypeORM + PostgreSQL ✅
- **Frontend**: React + Vite + TypeScript ✅
- **Banco de Dados**: PostgreSQL
- **Validação**: class-validator + DTOs
- **Migrations**: TypeORM Migrations (não synchronize)
- **Seed**: Script para dados de teste

## 📁 Estrutura do Projeto

```
prova-final/
├── backend/                 # NestJS + TypeORM + PostgreSQL
│   ├── src/
│   │   ├── entities/        # Entidades TypeORM
│   │   ├── controllers/     # Controllers REST
│   │   ├── services/        # Lógica de negócio
│   │   ├── dto/            # DTOs com validação
│   │   ├── migrations/     # Migrations do TypeORM
│   │   ├── seed/           # Script de seed
│   │   └── config/         # Configurações
│   ├── env.example         # Variáveis de ambiente
│   └── package.json
├── frontend/                # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── services/      # Serviços de API
│   │   ├── types/         # Tipos TypeScript
│   │   └── App.tsx        # Componente principal
│   └── package.json
├── db-verification-commands.md  # Comandos SQL para apresentação
├── postman_collection.json      # Coleção Postman
└── README.md
```

## 🗄️ Modelagem de Dados (PostgreSQL)

### Tabela: computadores
```sql
CREATE TABLE computadores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR NOT NULL,
  cor VARCHAR NOT NULL,
  "dataFabricacao" INTEGER NOT NULL
);
```

### Tabela: perifericos
```sql
CREATE TABLE perifericos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR NOT NULL,
  "computadorId" INTEGER REFERENCES computadores(id) ON DELETE CASCADE
);
```

### Relacionamentos
- **1:N**: Um computador pode ter vários periféricos
- **CASCADE DELETE**: Ao deletar computador, remove periféricos automaticamente
- **Foreign Key**: perifericos.computadorId → computadores.id

## 🛠️ Como Executar

### 1. Pré-requisitos
- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

### 2. Configuração do PostgreSQL
```bash
# Criar database
createdb prova_db

# Ou via psql:
psql -U postgres
CREATE DATABASE prova_db;
```

### 3. Backend (NestJS)
```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp env.example .env
# Edite o .env com suas credenciais do PostgreSQL

# Executar migrations
npm run migration:run

# Executar seed (dados de teste)
npm run seed

# Iniciar servidor
npm run start:dev
```

### 4. Frontend (React + Vite)
```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### 5. Acessar
- **API**: http://localhost:3000
- **Frontend**: http://localhost:5173

## 🔗 Endpoints da API

### Computadores
- `GET /computadores` - Lista todos os computadores com periféricos
- `GET /computadores/:id` - Busca computador por ID
- `POST /computadores` - Cria computador (aceita periféricos no payload)
- `PUT /computadores/:id` - Atualiza computador
- `DELETE /computadores/:id` - Remove computador (CASCADE DELETE)

### Periféricos
- `POST /computadores/:id/perifericos` - Adiciona periférico
- `PATCH /computadores/:id/perifericos/:pid` - Atualiza periférico
- `DELETE /computadores/:id/perifericos/:pid` - Remove periférico

## 📋 Scripts Disponíveis

### Backend
```bash
npm run start:dev      # Desenvolvimento
npm run build          # Build para produção
npm run start:prod     # Produção
npm run migration:run  # Executar migrations
npm run migration:revert # Reverter última migration
npm run seed           # Executar seed
```

### Frontend
```bash
npm run dev            # Desenvolvimento
npm run build          # Build para produção
npm run preview        # Preview da build
```

## 🧪 Dados de Teste (Seed)

O script de seed cria automaticamente:
- **2 computadores** com dados de exemplo
- **7 periféricos** distribuídos entre os computadores

### Exemplo de dados criados:
```json
{
  "computadores": [
    {
      "nome": "PC Gamer Pro",
      "cor": "Preto",
      "dataFabricacao": 2024,
      "perifericos": ["Mouse Gamer RGB", "Teclado Mecânico", "Monitor 27\" 4K"]
    },
    {
      "nome": "Workstation Dell",
      "cor": "Prata", 
      "dataFabricacao": 2023,
      "perifericos": ["Mouse Óptico", "Teclado USB", "Monitor 24\" Full HD", "Webcam HD"]
    }
  ]
}
```

## 🎯 Funcionalidades CRUD

### ✅ CREATE
- Adicionar computador (nome, cor, dataFabricacao)
- Adicionar periférico a computador
- Criar computador com periféricos no payload

### ✅ READ
- Listar todos os computadores com periféricos
- Buscar computador por ID
- Relacionamento 1:N funcionando

### ✅ UPDATE
- Editar computador (nome, cor, dataFabricacao)
- Editar periférico específico

### ✅ DELETE
- Remover computador (remove periféricos automaticamente)
- Remover periférico específico

## 🔍 Validações Implementadas

### DTOs com class-validator
- **Nome do computador**: obrigatório, string
- **Cor do computador**: obrigatória, string
- **Data de fabricação**: obrigatória, número
- **Nome do periférico**: obrigatório, string

### Exemplos de validação:
```typescript
export class CreateComputadorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cor: string;

  @IsNumber()
  dataFabricacao: number;
}
```

## 📊 Comandos SQL para Verificação

Todos os comandos SQL necessários para a apresentação estão no arquivo `db-verification-commands.md`.

### Exemplos básicos:
```sql
-- Ver todos os computadores
SELECT * FROM computadores;

-- Ver todos os periféricos
SELECT * FROM perifericos;

-- Ver computadores com periféricos
SELECT c.*, p.nome as periferico_nome 
FROM computadores c 
LEFT JOIN perifericos p ON c.id = p."computadorId";

-- Verificar CASCADE DELETE
SELECT * FROM perifericos WHERE "computadorId" = 1;
-- Após DELETE computador, esta consulta deve retornar 0 resultados
```

## 🧪 Testando com Postman

Importe o arquivo `postman_collection.json` no Postman para testar todos os endpoints.

### Exemplos de requisições:

#### Criar computador
```json
POST /computadores
{
  "nome": "PC Gamer Pro",
  "cor": "Preto",
  "dataFabricacao": 2024
}
```

#### Criar computador com periféricos
```json
POST /computadores
{
  "nome": "Workstation Dell",
  "cor": "Prata",
  "dataFabricacao": 2023,
  "perifericos": [
    {"nome": "Mouse Óptico"},
    {"nome": "Teclado USB"}
  ]
}
```

#### Atualizar periférico
```json
PATCH /computadores/1/perifericos/1
{
  "nome": "Mouse Gamer RGB Pro"
}
```

## 🎨 Frontend

### Páginas Implementadas
- **Listagem de computadores**: Grid responsivo com cards
- **Formulário de criação**: Modal com campos de periféricos dinâmicos
- **Edição inline**: Edição direta nos cards
- **Gestão de periféricos**: Adicionar, editar e remover periféricos

### Funcionalidades da UI
- ✅ Interface moderna e responsiva
- ✅ Validação de formulários
- ✅ Estados de loading e erro
- ✅ Confirmações para exclusões
- ✅ Modal para criação de computadores
- ✅ Edição inline de computadores e periféricos

## 🔧 Configuração de Ambiente

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=prova_db
PORT=3000
NODE_ENV=development
```

### Frontend (.env.local)
```env
VITE_API_BASE=http://localhost:3000
```

## 📋 Passos para Apresentação

### 1. Preparação
```bash
# Backend
cd backend
npm run migration:run
npm run seed
npm run start:dev

# Frontend (em outro terminal)
cd frontend
npm run dev
```

### 2. Demonstração das Operações

#### CREATE
1. **Frontend**: Adicionar computador via formulário
2. **SQL**: `SELECT * FROM computadores ORDER BY id DESC LIMIT 1;`
3. **Postman**: POST /computadores com periféricos

#### READ
1. **Frontend**: Visualizar lista de computadores
2. **SQL**: `SELECT * FROM computadores;`
3. **Postman**: GET /computadores

#### UPDATE
1. **Frontend**: Editar computador inline
2. **SQL**: `SELECT * FROM computadores WHERE id = 1;`
3. **Postman**: PUT /computadores/1

#### DELETE
1. **Frontend**: Excluir computador
2. **SQL**: `SELECT * FROM perifericos WHERE "computadorId" = 1;`
3. **Verificar**: CASCADE DELETE funcionando (0 resultados)

### 3. Verificações SQL
Use os comandos do arquivo `db-verification-commands.md` para comprovar cada operação.

## 🚀 Deploy

### Backend (Produção)
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend (Produção)
```bash
cd frontend
npm run build
# Servir arquivos da pasta dist/
```

## 📝 Notas Importantes

- **Migrations**: Sistema usa migrations explícitas, não synchronize
- **CASCADE DELETE**: Funciona corretamente para manter integridade
- **Validação**: Todos os campos obrigatórios são validados
- **Relacionamentos**: 1:N implementado corretamente
- **API REST**: Todos os endpoints funcionais
- **Frontend**: Interface completa e funcional

## 🐛 Troubleshooting

### Erro de conexão com banco
```bash
# Verificar se PostgreSQL está rodando
pg_ctl status

# Verificar credenciais no .env
cat backend/.env
```

### Erro de migrations
```bash
# Verificar se banco existe
psql -U postgres -l

# Recriar banco se necessário
dropdb prova_db
createdb prova_db
npm run migration:run
```

### Erro de CORS
- Verificar se backend está rodando na porta 3000
- Verificar configuração CORS no main.ts

## 📚 Recursos Adicionais

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Desenvolvido para atividade final - CRUD Computadores e Periféricos**

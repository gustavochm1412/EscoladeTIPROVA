# Comandos SQL para Verificação do Banco de Dados

Este arquivo contém todos os comandos SQL necessários para verificar as operações CRUD durante a apresentação.

## 📋 Comandos Básicos de Verificação

### 1. Verificar todas as tabelas
```sql
-- Listar todas as tabelas do banco
\dt

-- Verificar estrutura da tabela computadores
\d computadores

-- Verificar estrutura da tabela perifericos
\d perifericos
```

### 2. Verificar dados iniciais (após seed)
```sql
-- Ver todos os computadores
SELECT * FROM computadores;

-- Ver todos os periféricos
SELECT * FROM perifericos;

-- Ver computadores com seus periféricos (JOIN)
SELECT 
    c.id as computador_id,
    c.nome as computador_nome,
    c.cor,
    c."dataFabricacao",
    p.id as periferico_id,
    p.nome as periferico_nome
FROM computadores c
LEFT JOIN perifericos p ON c.id = p."computadorId"
ORDER BY c.id, p.id;
```

## 🔍 Comandos para Verificar Operações CRUD

### CREATE - Verificar Inserção

#### Após criar um computador via POST /computadores
```sql
-- Verificar se o computador foi inserido
SELECT * FROM computadores WHERE nome = 'Nome do Computador Criado';

-- Verificar o último computador inserido
SELECT * FROM computadores ORDER BY id DESC LIMIT 1;
```

#### Após criar um periférico via POST /computadores/:id/perifericos
```sql
-- Verificar se o periférico foi inserido
SELECT * FROM perifericos WHERE nome = 'Nome do Periférico Criado';

-- Verificar periféricos de um computador específico
SELECT * FROM perifericos WHERE "computadorId" = 1;
```

### READ - Verificar Consultas

#### Verificar busca por ID
```sql
-- Buscar computador por ID específico
SELECT * FROM computadores WHERE id = 1;

-- Buscar computador com seus periféricos
SELECT 
    c.*,
    p.id as periferico_id,
    p.nome as periferico_nome
FROM computadores c
LEFT JOIN perifericos p ON c.id = p."computadorId"
WHERE c.id = 1;
```

#### Verificar listagem completa
```sql
-- Listar todos os computadores com contagem de periféricos
SELECT 
    c.*,
    COUNT(p.id) as total_perifericos
FROM computadores c
LEFT JOIN perifericos p ON c.id = p."computadorId"
GROUP BY c.id
ORDER BY c.id;
```

### UPDATE - Verificar Atualizações

#### Após atualizar computador via PUT /computadores/:id
```sql
-- Verificar se o computador foi atualizado
SELECT * FROM computadores WHERE id = 1;

-- Comparar antes e depois (executar antes da atualização)
SELECT * FROM computadores WHERE id = 1;
-- Executar PUT
SELECT * FROM computadores WHERE id = 1;
```

#### Após atualizar periférico via PATCH /computadores/:id/perifericos/:pid
```sql
-- Verificar se o periférico foi atualizado
SELECT * FROM perifericos WHERE id = 1;

-- Verificar periféricos de um computador após atualização
SELECT * FROM perifericos WHERE "computadorId" = 1;
```

### DELETE - Verificar Remoções

#### Após remover periférico via DELETE /computadores/:id/perifericos/:pid
```sql
-- Verificar se o periférico foi removido
SELECT * FROM perifericos WHERE id = 1;

-- Verificar periféricos restantes do computador
SELECT * FROM perifericos WHERE "computadorId" = 1;

-- Contar periféricos restantes
SELECT COUNT(*) as perifericos_restantes FROM perifericos WHERE "computadorId" = 1;
```

#### Após remover computador via DELETE /computadores/:id (CASCADE DELETE)
```sql
-- Verificar se o computador foi removido
SELECT * FROM computadores WHERE id = 1;

-- Verificar se os periféricos foram removidos automaticamente (CASCADE)
SELECT * FROM perifericos WHERE "computadorId" = 1;

-- Esta consulta deve retornar 0 resultados devido ao ON DELETE CASCADE
```

## 🧪 Comandos para Testes Específicos

### Teste de Relacionamento 1:N
```sql
-- Verificar relacionamento entre computador e periféricos
SELECT 
    c.nome as computador,
    COUNT(p.id) as quantidade_perifericos,
    STRING_AGG(p.nome, ', ') as perifericos
FROM computadores c
LEFT JOIN perifericos p ON c.id = p."computadorId"
GROUP BY c.id, c.nome
ORDER BY c.id;
```

### Teste de Integridade Referencial
```sql
-- Verificar se não há periféricos órfãos
SELECT p.* 
FROM perifericos p 
LEFT JOIN computadores c ON p."computadorId" = c.id 
WHERE c.id IS NULL;

-- Esta consulta deve retornar 0 resultados
```

### Verificar Constraints
```sql
-- Verificar foreign keys
SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name IN ('computadores', 'perifericos');
```

## 📊 Comandos de Estatísticas

### Estatísticas gerais
```sql
-- Contar total de registros
SELECT 
    'Computadores' as tabela,
    COUNT(*) as total
FROM computadores
UNION ALL
SELECT 
    'Periféricos' as tabela,
    COUNT(*) as total
FROM perifericos;

-- Média de periféricos por computador
SELECT 
    AVG(perifericos_count) as media_perifericos_por_computador
FROM (
    SELECT COUNT(p.id) as perifericos_count
    FROM computadores c
    LEFT JOIN perifericos p ON c.id = p."computadorId"
    GROUP BY c.id
) as stats;
```

## 🎯 Sequência de Comandos para Apresentação

### 1. Estado Inicial (após seed)
```sql
SELECT * FROM computadores;
SELECT * FROM perifericos;
```

### 2. Após CREATE computador
```sql
SELECT * FROM computadores ORDER BY id DESC LIMIT 1;
```

### 3. Após CREATE periférico
```sql
SELECT * FROM perifericos WHERE "computadorId" = [ID_DO_COMPUTADOR];
```

### 4. Após UPDATE computador
```sql
SELECT * FROM computadores WHERE id = [ID_DO_COMPUTADOR];
```

### 5. Após UPDATE periférico
```sql
SELECT * FROM perifericos WHERE id = [ID_DO_PERIFERICO];
```

### 6. Após DELETE periférico
```sql
SELECT * FROM perifericos WHERE "computadorId" = [ID_DO_COMPUTADOR];
```

### 7. Após DELETE computador (CASCADE)
```sql
SELECT * FROM computadores WHERE id = [ID_DO_COMPUTADOR];
SELECT * FROM perifericos WHERE "computadorId" = [ID_DO_COMPUTADOR];
```

## 📝 Notas Importantes

- Substitua `[ID_DO_COMPUTADOR]` e `[ID_DO_PERIFERICO]` pelos IDs reais durante a apresentação
- Os comandos de CASCADE DELETE devem retornar 0 resultados após a remoção do computador
- Use `\q` para sair do psql
- Use `\c nome_do_banco` para conectar ao banco específico


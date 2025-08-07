# Tasks Backend

Backend para aplicação de gerenciamento de tarefas usando Node.js, Express e PostgreSQL.

## Pré-requisitos

- Node.js
- PostgreSQL 16
- npm ou yarn

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar PostgreSQL

1. Certifique-se de que o PostgreSQL está instalado e rodando
2. Crie um banco de dados chamado `tasks_db`:
   ```sql
   CREATE DATABASE tasks_db;
   ```

### 3. Configurar conexão com banco de dados

Edite o arquivo `database.js` e `knexfile.js` e altere a senha do PostgreSQL:

```javascript
password: 'sua_senha_aqui' // Altere para a senha que você definiu
```

### 4. Executar migrações

```bash
npm run migrate
```

### 5. Iniciar o servidor

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Endpoints da API

- `GET /` - Verificar se a API está funcionando
- `GET /tasks` - Listar todas as tarefas
- `POST /tasks` - Criar nova tarefa
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa

## Estrutura do projeto

```
tasks-backend/
├── index.js          # Servidor principal
├── database.js       # Configuração do banco de dados
├── knexfile.js       # Configuração do Knex
├── migrations/       # Migrações do banco de dados
└── package.json      # Dependências do projeto
```

## Resolução de problemas

### PostgreSQL não encontrado
Se o comando `psql` não for reconhecido, adicione o diretório bin do PostgreSQL ao PATH:

```powershell
$env:PATH += ";C:\Program Files\PostgreSQL\16\bin"
```

### Erro de conexão com banco de dados
1. Verifique se o PostgreSQL está rodando
2. Confirme se a senha está correta nos arquivos de configuração
3. Verifique se o banco `tasks_db` foi criado
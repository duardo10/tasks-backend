const knex = require('../knexfile');

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'sua_senha_aqui', // Você precisará definir a senha que configurou durante a instalação
    database: 'tasks_db'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
});

module.exports = db;

//Dados para se conectar com o banco;
const banco = 'alunos';
const usuario = 'root';
const senha = '';
const host = 'localhost';
const port = '3306';
const dialect = 'mysql';
//Sequelize, config;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(banco, usuario, senha, {
  host: host,
  port: port,
  dialect: dialect,
  query: {raw: true}
});

sequelize.authenticate().then(() => {
  console.log('Conectado ao banco com sucesso');
}).catch((erro) => {
  console.log('Erro ao se conectar com o banco' + erro);
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
};

const banco = require('./banco.js');

let alunos = banco.sequelize.define('alunos', {
  matricula: {
    type: banco.Sequelize.INTEGER
  },
  nome: {
    type: banco.Sequelize.STRING
  },
  sobrenome: {
    type: banco.Sequelize.STRING
  },
  turma: {
    type: banco.Sequelize.STRING
  },
  turno: {
    type: banco.Sequelize.STRING
  }
})

module.exports = alunos;

const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const alunos = require('./Models/dbAlunos.js');
const app = express();

//Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body-Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const porta = 8080;

//express.use css e imgs;
app.use('/Css', express.static(__dirname + '/Paginas/Css'));
app.use('/imgs', express.static(__dirname + '/Paginas/imgs'));

//app rotas;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Paginas/');
});

app.get('/cadastrar_form', (req, res) => {
  res.render('CadastroAlunos');
});

app.post('/cadastrar', (req, res) => {
  alunos.create({
    matricula: req.body.matricula,
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    turma: req.body.turma,
    turno: req.body.turno
  }).then(() => {
    res.redirect('/cadastrar_form');
  });
});

app.get('/vizualizar', (req, res) => {
  alunos.findAll().then((dados) => {
    res.render('Vizualizar', {alunos: dados});
  });
});

app.get('/expulsar_form', (req, res) => {
  alunos.findAll().then((dados) => {
    res.render('expulsar_form', {alunos: dados});
  });
});

app.post('/expulsar', (req, res) => {
  alunos.destroy({where: {id: req.body.id} && {nome: req.body.nome}});
  res.redirect('/expulsar_form');
})

app.get('/alterar_form/', (req, res) => {
  alunos.findAll().then((dados) => {
    res.render('alterar', {alunos: dados});
  });
});

app.post('/procurar', (req, res) => {
  //res.send('Olá mundo ' + req.body.id);
  if (req.body.procurar) {
    alunos.findAll().then((dados) => {
      alunos.findAll({where: {id: req.body.id}}).then((dado) => {
        res.render('alterar', {alunos: dados, procurar: req.body.id, aluno: dado});
      })
    });
  }else{
    res.send('Não enviado');
  }
});

app.post('/alterar', (req, res) => {
  alunos.update({
    matricula: req.body.matricula,
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    turma: req.body.turma,
    turno: req.body.turno
  }, {where: {id: req.body.id}}).then(() => {
    res.redirect('/alterar_form');
  }).catch((erro) => {
    res.send('Erro ' + erro);
  })
})
app.listen(porta, () => {
  console.log('Servidor está rodando na porta ' + porta);
});

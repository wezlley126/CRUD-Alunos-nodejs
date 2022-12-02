const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
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

app.listen(porta, () => {
  console.log('Servidor está rodando na porta ' + porta);
});

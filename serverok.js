var express = require('express'); //a dependencia express promove as infraestrutura das rotas, sem precisar configurar manualmente
var bodyParser = require('body-parser'); //o bodyparser permite a criação de objetos em json e x-www-urlenconded

var app = express(); //com o uso do express configurar parte de rede, como qual a porta que sera utilizada pelo servidor.
var port = process.env.PORT || 3000;
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//criacao do CORS
app.use(function(req, res, next){ 
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');//metodos de de manipulacao de dados aceitos
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})


var cafes = [ //como não temos banco de dados, os dados serao armazenados na variavel cafes
  { nome: 'cafe1', ml: '600ml' },
  { nome: 'cafe2', ml: '200ml' },
  { nome: 'cafe3', ml: '350ml' }
];

router.use(function(request, response, next) {
  console.log('Requisição'); //mensagem exibida a cada requisição feita ao servidor
  next();
});

router.get('/', function(request, response) {
  response.json({ message: 'Executando em /cafes' });
});

var cafesRoute = router.route('/cafes'); //rota que mostra todos tipo de cafe
var cafeRoute = router.route('/cafe/:id'); //rota que mostra apenas um cafe especificado pelo numero da ID
var editcafeRoute = router.route('/cafe/:id/edit'); //rota para editar um cafe

cafesRoute.get(function(request, response) { //exibir tudo que tem dentro da variavel cafes, ou seja todos os cafes cadastrados
  response.json(cafes);
});

cafesRoute.post(function(request, response) { //rota para inserir cafe atraves do metodos POST
  var cafe = {
    nome: request.body.nome,
    ml: request.body.ml
  };

  cafes.push(cafe);
  response.json(cafe);
});

cafeRoute.get(function(request, response) { //exibir tudo que tem dentro da variavel cafes, ou seja todos os cafes cadastrados
  var cafe = cafes[request.params.id - 1];
  response.json(cafe);
});

editcafeRoute.put(function(request, response) {
  var cafe = cafes[request.params.id];

  cafe.nome = request.body.nome, //rota para atraves do PUT alterar um cafe
  cafe.ml = request.body.ml;
  response.json({ message: "cafe alterada com sucesso", data: cafe });
});

cafeRoute.delete(function(request, response) { //rota para deletar um cafe atraves do metodo DELETE
  cafes.splice(request.params.id, 1);
  response.json(true);
});

app.use('/api', router);
app.listen(port, function() {
  console.log('Vamo que vamo!: ' + port);
});





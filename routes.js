const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const testesController = require('./src/controllers/testesController');
const contatoController = require('./src/controllers/contatoController');

// Rotas da Home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.enviaPost);
route.get('/:cliente?', contatoController.index);

// Rotas de Testes
route.get('/testes/:idUser?/:detalhe?', testesController.testesReq);

// Rotas de Contato
route.get('/contato', contatoController.index);


module.exports = route;
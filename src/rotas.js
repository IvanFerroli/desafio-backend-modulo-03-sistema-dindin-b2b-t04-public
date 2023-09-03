const express = require('express');
const { cadastrarUsuario, login, detalharUsuario } = require('./controladores/usuarios');
const verificarLogin = require('./intermediarios/verificarLogin');
const { listarCategorias } = require('./controladores/categorias');
const { listarTransacoes } = require('./controladores/transacoes');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', login);

rotas.use(verificarLogin);

rotas.get('/usuario', detalharUsuario)
rotas.get('/categoria', listarCategorias)
rotas.get('/transacao', listarTransacoes)

module.exports = rotas;
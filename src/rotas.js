const express = require('express');
const { cadastrarUsuario, login, detalharUsuario, atualizarUsuario } = require('./controladores/usuarios');


const verificarLogin = require('./intermediarios/verificarLogin');
const { listarCategorias } = require('./controladores/categorias');
const { listarTransacoes, encontrarTransacaoPorId, editarTransacao, cadastrarTransacao, detalharTransacao, obterExtrato } = require('./controladores/transacoes.js');
const { removerTransacao } = require('./controladores/transacoes.js');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', login);

rotas.use(verificarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario);

rotas.get('/categoria', listarCategorias);
rotas.get('/transacao', listarTransacoes);
rotas.get('/transacao/extrato', obterExtrato)
rotas.get('/transacao/:id', detalharTransacao);
rotas.post('/transacao', cadastrarTransacao);
rotas.put('/transacao/:id', editarTransacao);
rotas.delete('/transacao/:id', removerTransacao);

module.exports = rotas;

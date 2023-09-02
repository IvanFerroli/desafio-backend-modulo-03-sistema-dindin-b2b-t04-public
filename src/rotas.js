const express = require('express');
const { cadastrarUsuario, login, detalharUsuario } = require('./controladores/usuarios');
const verificarLogin = require('./intermediarios/verificarLogin');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', login);

rotas.use(verificarLogin);

rotas.get('/usuario', detalharUsuario)

module.exports = rotas;
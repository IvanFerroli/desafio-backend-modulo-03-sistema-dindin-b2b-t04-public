const conectarBanco = require("../config/dadosDoBanco");

const atualizarUsuarioNoBanco = (novosDados) => {
    const { nome, email, senhaCriptografada, usuarioId } = novosDados;
    const queryAtualizar = conectarBanco.query(`
UPDATE usuarios
SET nome = $1, email = $2, senha = $3
WHERE id = $4;`, [nome, email, senhaCriptografada, usuarioId]);
    return queryAtualizar
};

module.exports = {
    atualizarUsuarioNoBanco
};
const jwt = require('jsonwebtoken');
const { senhaToken } = require('../dadosSensiveis');
const { encontrarIdlUsuario } = require('../repositorios/usuario');

const verificarLogin = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ mensagem: "Usuario não logado." })
    };



    try {
        const token = req.headers.authorization.split(" ")[1]
        const { id } = jwt.verify(token, senhaToken)
        const { rows: usuariosLogados, rowCount } = await encontrarIdlUsuario(id);

        req.usuarioLogado = usuariosLogados[0];

        next()

    } catch (error) {

        return res.status(401).json({ mensagem: 'Token inválido.' });
    }

};

module.exports = {
    verificarLogin
}
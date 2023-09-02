const bcrypt = require('bcrypt')

const compararSenha = (senha, senhaCriptografada) => {

    return bcrypt.compare(senha, senhaCriptografada)
};

module.exports = compararSenha;

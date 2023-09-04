const conectarBanco = require("../config/dadosDoBanco");


const cadastrandoUsuario = (novosDados) => {
    const { nome, email, senhaCriptografada } = novosDados;


    const queryCadastroDoUsuario = conectarBanco.query(`
INSERT INTO 
    usuarios(nome, email, senha)
VALUES
    ($1, $2, $3) RETURNING *
`, [nome, email, senhaCriptografada]);

    return queryCadastroDoUsuario
};


const encontrarEmailUsuario = (email) => {

    const verificarEmail = conectarBanco.query(`
    SELECT 
    	* 
    FROM
        usuarios
    WHERE 
        email = $1 
`, [email])

    return verificarEmail;
};

const encontrarIdlUsuario = (id) => {

    const verificarId = conectarBanco.query(`
    SELECT 
    	id, nome, email
    FROM
        usuarios
    WHERE 
        id = $1 
`, [id])

    return verificarId;
};

module.exports = {
    cadastrandoUsuario,
    encontrarEmailUsuario,
    encontrarIdlUsuario
}
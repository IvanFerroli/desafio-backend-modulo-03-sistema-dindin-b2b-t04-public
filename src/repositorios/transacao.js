const conectarBanco = require("../config/dadosDoBanco");

const encontrarTransacaoPorId = (id) => {
    const queryEncontrarTransacaoPorId = conectarBanco.query('SELECT * FROM transacoes WHERE id = $1', [id]);

    return queryEncontrarTransacaoPorId;
};


const encontrarCategoriaPorId = (categoria_id) => {
    const queryCategoriaId = conectarBanco.query(`
    SELECT 
	    *
    FROM	
 	    categorias
    WHERE 
 	    id = $1;
`, [categoria_id]);
    return queryCategoriaId;
};

const cadastrarTransacaoNoBanco = (novosDados) => {
    const { tipo, descricao, valor, data, categoria_id, usuarioId } = novosDados;

    const queryCadastrarNoBanco = conectarBanco.query(`
    INSERT INTO 
        transacoes 
        (descricao, valor, data, categoria_id, tipo, usuario_id)
    VALUES 
        ($1, $2, $3, $4, $5, $6) RETURNING *
    `, [descricao, valor, data, categoria_id, tipo, usuarioId]);

    return queryCadastrarNoBanco
}
module.exports = {
    encontrarTransacaoPorId,
    encontrarCategoriaPorId,
    cadastrarTransacaoNoBanco
}
const conectarBanco = require('../config/dadosDoBanco');
const { encontrarTransacaoPorId, encontrarCategoriaPorId, cadastrarTransacaoNoBanco } = require('../repositorios/transacao');
const { encontrarUsuarioPeloIdDoToken } = require('../repositorios/usuario');

const listarTransacoes = async (req, res) => {
    const usuarioId = encontrarUsuarioPeloIdDoToken(req);

    try {
        const query = `
            SELECT
                t.id,
                t.tipo,
                t.descricao,
                t.valor,
                t.data,
                t.usuario_id,
                t.categoria_id,
                c.descricao AS categoria_nome
            FROM
                transacoes t
            JOIN
                categorias c ON t.categoria_id = c.id
            WHERE
                t.usuario_id = $1
        `;

        const { rows } = await conectarBanco.query(query, [usuarioId]);

        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};



const detalharTransacao = async (req, res) => {
    const { id } = req.params;
    const usuarioId = encontrarUsuarioPeloIdDoToken(req);

    try {
        const query = `
        SELECT
        t.id,
        t.tipo,
        t.descricao,
        t.valor,
        t.data,
        t.usuario_id,
        t.categoria_id,
        c.descricao AS categoria_nome
    FROM
        transacoes AS t
    INNER JOIN
        categorias AS c
    ON
        t.categoria_id = c.id
    WHERE
        t.usuario_id = $1 AND t.id = $2;
        `;

        const { rows, rowCount } = await conectarBanco.query(query, [usuarioId, id]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        };
        return res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

const cadastrarTransacao = async (req, res) => {
    const usuarioId = encontrarUsuarioPeloIdDoToken(req);
    const { tipo, descricao, valor, data, categoria_id } = req.body;

    if (!tipo || !descricao || !valor || !data || !categoria_id) {
        return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados." })
    };

    try {
        const { rowCount } = await encontrarCategoriaPorId(categoria_id);


        if (rowCount === 0) {
            return res.status(400).json({ mensagem: "A categoria especificada não existe." });
        };

        if (tipo.toLowerCase() !== "entrada" && tipo.toLowerCase() !== "saida") {
            return res.status(400).json({ mensagem: "Por favro, informe corretamente qual é o tipo de transação que você está efetuando." })
        };

        const novosDados = { tipo, descricao, valor, data, categoria_id, usuarioId }
        const { rows: cadastrarNoBanco } = await cadastrarTransacaoNoBanco(novosDados)

        const consulta = `
        SELECT
            t.id,
            t.tipo,
            t.descricao,
            t.valor,
            t.data,
            t.usuario_id,
            t.categoria_id,
            c.descricao AS categoria_nome
        FROM
            transacoes AS t
        INNER JOIN
            categorias AS c
        ON
            t.categoria_id = c.id
        WHERE
            t.id = $1;
    `;
        const { rows: transacaoCompleta } = await conectarBanco.query(consulta, [cadastrarNoBanco[0].id]);

        return res.status(200).json(transacaoCompleta[0])

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }

};


const editarTransacao = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const usuarioId = encontrarUsuarioPeloIdDoToken(req);

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados." })
    };

    try {
        const { rowCount } = await encontrarCategoriaPorId(categoria_id);
        const { rows: transacaoExistente } = await encontrarTransacaoPorId(id);

        if (rowCount < 1) {
            return res.status(400).json({ mensagem: "A categoria especificada não existe." });
        }
        if (transacaoExistente[0].usuario_id !== usuarioId) {
            return res.status(404).json({ mensagem: "Transação não encontrada." })
        };
        if (tipo.toLowerCase() !== "entrada" && tipo.toLowerCase() !== "saida") {
            return res.status(400).json({ mensagem: "Por favro, informe corretamente qual é o tipo de transação que você está efetuando." })
        };

        const queryEditarTransacao = `
        UPDATE transacoes
        SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5
        WHERE id = $6
        RETURNING *
      `;

        const { rows: transacaoEditada } = await conectarBanco.query(queryEditarTransacao, [
            descricao,
            valor,
            data,
            categoria_id,
            tipo,
            id,
        ]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        };

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};


const removerTransacao = async (req, res) => {
    const { id } = req.params;
    const usuarioId = encontrarUsuarioPeloIdDoToken(req);

    try {

        const { rows: transacaoExistente, rowCount } = await encontrarTransacaoPorId(id);

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        };

        if (transacaoExistente[0].usuario_id !== usuarioId || rowCount < 1) {
            return res.status(404).json({ mensagem: "Transação não encontrada." })
        };

        const queryRemoverTransacao = 'DELETE FROM transacoes WHERE id = $1 AND usuario_id = $2';
        await conectarBanco.query(queryRemoverTransacao, [id, usuarioId]);

        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    listarTransacoes,
    cadastrarTransacao,
    detalharTransacao,
    editarTransacao,
    removerTransacao
    // encontrarTransacaoPorId,
};

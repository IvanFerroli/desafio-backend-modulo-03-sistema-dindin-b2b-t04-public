const conectarBanco = require('../config/dadosDoBanco');

const listarTransacoes = async (req, res) => {
    const usuarioId = req.usuarioLogado.id;

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
        console.error("Erro na listagem de transações:", error);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

const conectarBanco = require('../config/dadosDoBanco');

const encontrarTransacaoPorId = async (id) => {
  try {
    const query = 'SELECT * FROM transacoes WHERE id = $1';
    const { rows } = await conectarBanco.query(query, [id]);

    if (rows.length === 0) {
      return null; 
    }

    return rows[0]; 
  } catch (error) {
    throw error;
  }
};

const editarTransacao = async (req, res) => {
    const { id } = req.params; 
    const { descricao, valor, data, categoria_id, tipo } = req.body; 
  
    try {
      
      const transacaoExistente = await encontrarTransacaoPorId(id);
  
      if (!transacaoExistente) {
        return res.status(404).json({ mensagem: 'Transação não encontrada.' });
      }
  
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
  
      return res.status(200).json(transacaoEditada[0]);
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  };

const conectarBanco = require('../config/dadosDoBanco');
const { encontrarTransacaoPorId } = require('../repositorios/transacoes');

const removerTransacao = async (req, res) => {
  const { id } = req.params; 

  try {

    const transacaoExistente = await encontrarTransacaoPorId(id);

    if (!transacaoExistente) {
      return res.status(404).json({ mensagem: 'Transação não encontrada.' });
    }

    const queryRemoverTransacao = 'DELETE FROM transacoes WHERE id = $1';
    await conectarBanco.query(queryRemoverTransacao, [id]);

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};
  
module.exports = {
    listarTransacoes,
    encontrarTransacaoPorId,
    editarTransacao,
    removerTransacao,
};

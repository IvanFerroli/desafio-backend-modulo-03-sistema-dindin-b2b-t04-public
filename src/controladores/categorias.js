const conectarBanco = require("../config/dadosDoBanco");


const listarCategorias = async (req, res) => {
    try {
        const query = `
            SELECT * FROM categorias;
        `;

        const { rows } = await conectarBanco.query(query);

        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    };
};

module.exports = {
    listarCategorias,
}
const criptografarSenha = require('../criptografarSenha');
const { cadastrandoUsuario, encontrarEmailUsuario } = require('../repositorios/encontrarUsuario');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Por favor, preencha todos os campos." })
    };

    try {

        const emailJaCadastrado = await encontrarEmailUsuario(email);

        if (emailJaCadastrado.rowCount > 0) {
            return res.status(400).json({ mensagem: "Este email já está cadastrado." });
        }

        const senhaCriptografada = await criptografarSenha(senha);
        const novosDados = { nome, email, senhaCriptografada };

        const { rows: cadastrosFeito } = await cadastrandoUsuario(novosDados);
        const cadastroFeito = cadastrosFeito[0]
        delete cadastroFeito.senha;

        return res.status(201).json(cadastroFeito);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }

};

module.exports = {
    cadastrarUsuario
}
const compararSenha = require('../utils/compararSenha');
const criptografarSenha = require('../utils/criptografarSenha');
const jwt = require('jsonwebtoken')
const { cadastrandoUsuario, encontrarEmailUsuario, encontrarUsuarioPeloIdDoToken } = require('../repositorios/usuario');
const { senhaToken } = require('../dadosSensiveis');
const { atualizarUsuarioNoBanco } = require('../repositorios/informacoesUsuario');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {

        return res.status(400).json({ mensagem: "Por favor, preencha todos os campos." })
    };

    try {

        const emailJaCadastrado = await encontrarEmailUsuario(email);


        if (emailJaCadastrado.rowCount > 0) {

            return res.status(400).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." });
        }

        const senhaCriptografada = await criptografarSenha(senha);
        const novosDados = { nome, email, senhaCriptografada };

        const { rows: cadastrosFeito } = await cadastrandoUsuario(novosDados);
        const cadastroFeito = cadastrosFeito[0]
        delete cadastroFeito.senha;

        return res.status(201).json(cadastroFeito);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }

};

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });

    };

    try {

        const { rows: emailsEncontrados, rowCount } = await encontrarEmailUsuario(email);

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        };

        const emailEncontrado = emailsEncontrados[0];

        const conferirSenha = await compararSenha(senha, emailEncontrado.senha)

        if (!conferirSenha) {
            return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        };

        const token = jwt.sign({ id: emailEncontrado.id }, senhaToken, { expiresIn: "20m" });
        delete emailEncontrado.senha
        return res.status(200).json({ usuario: emailEncontrado, token });


    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    };
};


const detalharUsuario = async (req, res) => {
    return res.status(200).json(req.usuarioLogado);
};

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const usuarioId = encontrarUsuarioPeloIdDoToken(req);
    const emailDoToken = req.usuarioLogado.email;
    const { rows } = await encontrarEmailUsuario(email);


    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    };


    try {

        const emailDoBanco = rows[0].email;


        if (email !== emailDoToken) {
            if (emailDoBanco) {
                return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." })
            }
        };



        const senhaCriptografada = await criptografarSenha(senha);
        const novosDados = { nome, email, senhaCriptografada, usuarioId }
        const atualizarNoBanco = await atualizarUsuarioNoBanco(novosDados);

        return res.status(204).json();


    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    };
};

module.exports = {
    cadastrarUsuario,
    login,
    detalharUsuario,
    atualizarUsuario
};
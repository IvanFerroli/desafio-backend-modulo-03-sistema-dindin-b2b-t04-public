const validarTipoTransacao = (tipo) => {
    return tipo.toLowerCase() === "entrada" || tipo.toLowerCase() === "saida";
};

const validarCamposObrigatorios = (body) => {
    const camposObrigatorios = ["tipo", "descricao", "valor", "data", "categoria_id"];

    for (const campo of camposObrigatorios) {
        if (!body[campo]) {
            return false;
        }
    }

    return true;
};

module.exports = {
    validarTipoTransacao,
    validarCamposObrigatorios,
};

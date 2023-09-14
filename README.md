Bem-vindo ao repositório do projeto Cubos Finanças, desenvolvido por Ivanilson F. de Oliveira e Lucas H. M. Souza como parte do Módulo 3 da Cubos Academy! Neste projeto, criamos uma aplicação de Gestão Financeira para ajudar você a controlar suas finanças pessoais.

## 💡 Descrição do Projeto

Cubos Finanças é uma aplicação que oferece recursos para ajudar os usuários a gerenciar suas finanças pessoais. Com esta aplicação, você pode:

- ✅ **Cadastro e Autenticação de Usuários:** Registre-se na plataforma e acesse sua conta com segurança.

- 💳 **Gestão de Transações:** Registre suas transações financeiras, como despesas e receitas. Você pode listar, editar e excluir suas transações.

- 🗂️ **Categorias:** Organize suas transações em categorias para uma melhor análise.

- 📈 **Extrato Financeiro:** Visualize um resumo de suas transações, incluindo o saldo atual.

- 🧐 **Filtrar Transações por Categoria:** Analise suas transações filtrando por categoria.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- 🚀 **Node.js:** Para o desenvolvimento do backend da aplicação.
- 🌐 **Express:** Um framework web para Node.js, usado para criar a API.
- 🐘 **PostgreSQL:** Banco de dados utilizado para armazenar informações de usuários e transações.
- 🔐 **JWT (JSON Web Tokens):** Para autenticação de usuários.
- 🔑 **bcrypt:** Para criptografar senhas de usuários.
- ☁️ **Heroku:** Plataforma em nuvem para implantação da aplicação.

## 📥 Instalação e Uso

Para executar a aplicação em sua máquina local, siga os seguintes passos:

1. **Clone este repositório:**

   ```shell
   git clone https://github.com/IvanFerroli/desafio-backend-modulo-03-sistema-dindin-b2b-t04-public
   ```

2. **Instale as dependências do projeto:**

   ```shell
   cd desafio-backend-modulo-03-sistema-dindin-b2b-t04-public
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias, como a conexão com o banco de dados e a chave secreta para JWT.

4. **Execute a aplicação:**

   ```shell
   npm start
   ```

A aplicação estará disponível em `http://localhost:3000`. Certifique-se de que o PostgreSQL esteja em execução e configurado corretamente para que a aplicação possa se conectar ao banco de dados.

## 🌐 Endpoints da API

A API possui os seguintes endpoints:

- `POST /usuario`: Cria um novo usuário.
- `POST /login`: Realiza a autenticação do usuário e fornece um token.
- `GET /usuario`: Retorna os dados do usuário logado.
- `PUT /usuario`: Atualiza os dados do usuário logado.
- `GET /categoria`: Lista as categorias disponíveis.
- `GET /transacao`: Lista todas as transações do usuário logado.
- `GET /transacao/extrato`: Retorna o extrato financeiro do usuário.
- `GET /transacao/:id`: Retorna detalhes de uma transação específica.
- `POST /transacao`: Cadastra uma nova transação.
- `PUT /transacao/:id`: Atualiza uma transação existente.
- `DELETE /transacao/:id`: Exclui uma transação.

## 🤝 Contribuição

Se você deseja contribuir para o desenvolvimento deste projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para sua nova feature ou correção de bug: `git checkout -b nome-da-sua-branch`.
3. Faça suas alterações e comite-as: `git commit -m 'Adicione uma nova feature'`.
4. Faça push para o repositório remoto: `git push origin nome-da-sua-branch`.
5. Abra um pull request para a branch principal do repositório original.

## 👨‍💻 Autores

- Ivanilson F. de Oliveira
- Lucas H. M. Souza

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---
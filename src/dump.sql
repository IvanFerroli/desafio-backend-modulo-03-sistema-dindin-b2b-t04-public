-- Criação do banco de dados "dindin" ;
create database dindin;

--Criação das tabelas usuarios, categorias e transacoes (criar todas de uma vez para relacionar os id's):
CREATE TABLE 
	usuarios (
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
  );

CREATE TABLE
	categorias(
 id serial primary key,
    descricao text
 );
 
 CREATE TABLE
 transacoes(
 id serial primary key,
 descricao text,
 valor integer not null,
 data date not null,
 categoria_id integer references categorias(id),
 usuario_id integer references usuarios(id),
 tipo text not null
 );

--Inserção das categorias na tabela categorias: 
INSERT INTO categorias (descricao) VALUES
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');

-- Delete para testar erro nas categorias: 
DELETE FROM categorias;

CREATE DATABASE desafio_clarke;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
	email VARCHAR,
  senha TEXT
);

CREATE TABLE fornecedores (
  id SERIAL PRIMARY KEY,
	nome VARCHAR,
  logo VARCHAR,
  estado VARCHAR,
  custo MONEY,
  minimo DECIMAL,
  num_clientes INT,
  nota DECIMAL
);
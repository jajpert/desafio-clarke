CREATE DATABASE desafio_clarke;

CREATE TABLE fornecedores (
  id SERIAL PRIMARY KEY,
	nome VARCHAR,
  logo VARCHAR,
  estado CHAR(2),
  custo DECIMAL,
  minimo DECIMAL,
  num_clientes INT,
  nota DECIMAL
);
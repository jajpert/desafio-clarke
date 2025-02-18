# Desafio Clarke

Este projeto é um sistema completo com **backend**, **frontend** e **banco de dados**. O backend foi desenvolvido em **Node.js** com **TypeScript**, utilizando **Express** como framework web e **Knex.js** como query builder para o banco de dados **PostgreSQL**. O frontend foi construído com **React**, **Tailwind CSS**, **TypeScript** e **Vite**. Além disso, o projeto utiliza **Backblaze B2** para armazenamento de arquivos.

## Requisitos

Antes de rodar o projeto, certifique-se de ter os seguintes softwares instalados:
- **Node.js** (versão mais recente recomendada)
- **PostgreSQL**
- **NPM** ou **Yarn**

## Configuração do Banco de Dados

O banco de dados PostgreSQL deve ser configurado conforme o arquivo `banco.sql`.

### Estrutura do Banco de Dados

```sql
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
```

1. Crie o banco de dados executando o comando:
   ```bash
   psql -U [USUARIO] -h [HOST] -d postgres -c "CREATE DATABASE desafio_clarke;"
   ```
2. Execute o script `banco.sql` para criar as tabelas.
   ```bash
   psql -U [USUARIO] -h [HOST] -d desafio_clarke -f banco.sql
   ```
3. Configure as credenciais do banco no arquivo `.env`.

## Configuração do Armazenamento (Backblaze B2)

1. Crie uma conta no [Backblaze](https://www.backblaze.com/).
2. Crie um **bucket** no serviço B2.
3. Gere uma **Application Key**.
4. Preencha as informações no arquivo `.env`.

## Configuração do Arquivo .env

O arquivo `.env.example` contém todas as variáveis necessárias para rodar o projeto. Você deve criar um arquivo `.env` na raiz do backend e preenchê-lo com os valores adequados.

Exemplo de `.env`:

```
PORT=[number]
NODE_ENV=[string]

DB_HOST=[string]
DB_PORT=[number]
DB=[string]
DB_USER=[string]
DB_PASS=[string]

KEY_ID=[string]
APP_KEY=[string]
KEY_NAME=[string]
ENDPOINT_S3=[string]
```

## Configuração da Whitelist

A aplicação possui um mecanismo de **whitelist** para permitir apenas requisições de origens específicas. Para rodar o sistema localmente, você deve garantir que os domínios corretos estejam incluídos:

```typescript
const whitelist = new Set(isHttps 
  ? [`https://localhost:${port}`, 'https://ipfront:portafront']
  : [`http://localhost:${port}`, 'http://ipfront:portafront']
);
```

Caso esteja rodando em outro ambiente, atualize essa lista conforme necessário.

## Instalação e Execução do Backend

Clone o repositório e instale as dependências:

```bash
git clone [URL_DO_REPO]
cd [NOME_DO_PROJETO]/backend
npm install
```

### Scripts disponíveis (Backend)

No arquivo `package.json`, temos os seguintes scripts:

- **`dev`**: Inicia o servidor em modo de desenvolvimento, com **watch** para reiniciar automaticamente em mudanças.
  ```bash
  npm run dev
  ```

- **`build`**: Remove o diretório de build anterior e compila o TypeScript.
  ```bash
  npm run build
  ```

- **`postbuild`**: Copia os arquivos `package.json` e `.env` para o diretório de produção e instala as dependências em modo de produção.
  ```bash
  npm run postbuild
  ```

- **`prestart`**: Executa `build` antes de iniciar a aplicação.
  ```bash
  npm run prestart
  ```

- **`start`**: Executa o servidor a partir do build gerado.
  ```bash
  npm start
  ```

- **`test`**: Executa os testes com Jest.
  ```bash
  npm test
  ```

## Instalação e Execução do Frontend

O frontend roda na porta **3000** e foi desenvolvido com **React**, **Tailwind CSS**, **TypeScript** e **Vite**.

Para rodar o frontend:

```bash
git clone [URL_DO_REPO]
cd [NOME_DO_PROJETO]/frontend
npm install
npm run dev
```

### Scripts disponíveis (Frontend)

No arquivo `package.json`, temos os seguintes scripts:

- **`dev`**: Inicia o servidor de desenvolvimento com o Vite.
  ```bash
  npm run dev
  ```

- **`build`**: Compila o projeto para produção.
  ```bash
  npm run build
  ```

- **`lint`**: Analisa o código com ESLint para garantir boas práticas.
  ```bash
  npm run lint
  ```

- **`preview`**: Exibe uma prévia da build gerada.
  ```bash
  npm run preview
  ```

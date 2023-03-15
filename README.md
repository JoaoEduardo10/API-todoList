# Projeto Todo List

## Funcionalidades

- [x] Criação de usuário.
- [x] Login de usuário.
- [x] Criação Board que vai guarda as tasks por usuário.
- [x] Buscar todoas as Boards por usuário.
- [x] Buscar uma board por id contento todas as tasks referente a ela.
- [x] delete uma Bords que guarda as tasks por usuário.
- [x] Buasca Todas as tasks.
- [x] Cria as tasks
- [x] delete a task
- [x] atualiza a task

## Sobre

O projeto foi pensado para que fosse fácil a troca de banco de dados, fácil de testar possiveis erros e todo o servidor, reutilização de codigo sempre utilizando o máximo possivel de SOLID. Caso queira sabe um pouco mais da API, fiz uma documentação para ela com swagger, la esta tudo muito bem explicado de como utilizar cada rota

OBS: Este Projeto contem variavel de ambiente adicione elas antes de começar o usar o projeto

- PORT= porta que desejar
- MONGODB_URL= mongodb+srv://example pege ela no mongoDb atlas ou inicie um conteiner com doker
- MONGODB_USER= seu usuario
- MONGODB_PASSWORD= sua senha
- HASH_JWT= gera uma hash para jwt

```
# etapas
1. npm install ou yarn dev
2. npm run dev ou yarn dev
3. use Ctrl + click no link Enter the documentation no terminal
```

## Feature

### dataBase

- Faz coneção com o banco de dados.

### Server

- Guarda todo o codigo da aplicação referente ao servido.

### src/index

- Junta o banco de dados com o servidor.

### repository

- Deleta, cria, atualiza ou busca dados no banco de dados.

### controller

- Pega a resposta do repository e retorna um status e um body.

### useCase

- Junta o repository com o controller para retorna a resposta ao servidor.

### models

- Reponsavel por criar a collection ou as
  entities como preferir chamar.

### middlewares

- Server como um mediador entre as requisições, tambem guarda o middleware global responsavel por excluir o tryCath da aplicação.

### helpers

- Guarda todos os codigos reutilizaveis.

### router

- Onde fica todas as rotas da aplicação

### types

- Onde fica as tipagens globais

### test

- Onde fica todos os teste da aplicação

## Tecnologias utilizadas

1. [express](https://expressjs.com/pt-br/)

- Utilizei pelo fato de ser um dos melhores Framework web "na minha opnião" para desenvolver de Apis com node atualmente e tambem pela sua fexibilidade e rapides.

2. [mongoose](https://mongoosejs.com/)

- Por ser um ODM pratica e muito facil de se utilizar. Elem de ser muito prático tipar as collections.

4. [express-async-errors](https://www.npmjs.com/package/express-async-errors)

- Essa biblioteca permite voçê excluir totalmente p tryCath da sua aplicão.

5. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

- Totalmente prática ao gera e compara um JWT

6. [bcryptj](https://www.npmjs.com/package/bcryptjs)

- Utilizei pelo fato dele ser totalmente utimizado para javascript e sua facil utilidade.

7. [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

- Muito util na hora de documentar o codigo muito e pratico de usar.

8. [validator](https://www.npmjs.com/package/validator)

- Muito Rápido ao fazer uma validação de email ou outros parametros.

9. [vitest](https://vitest.dev/)

- Utilizei pelo fato de ser uma das melhores e mais utilizadas tecnologias de test

10. [supertest](https://www.npmjs.com/package/supertest)

- Utilizei por sua facilidade de testa as rotas do servidor

11. [eslint](https://eslint.org/)

- Facilidade de ver errors no codigo e ajuda com problemas

## Como rodar o projeto

OBS: Este Projeto contem variavel de ambiente adicione elas antes de começar o usar o projeto

- PORT= porta que desejar
- MONGODB_URL=mongodb+srv://example pege ela no mongoDb atlas ou inicie um conteiner com doker
- MONGODB_USER= seu usuario
- MONGODB_PASSWORD= sua senha
- HASH_JWT= gera uma hash para jwt

```bash
# instale as dependencias
$ npm install ou yarn add

# caso querira iniciar a aplicação e desenvolvimento
$ npm run dev ou yarn dev

# para gera um build do projeto
$ npm run build ou yarn build

# caso querira iniciar a aplicação para produção siga essas etapas:
1 - npm run build ou yarn build
2 - npm run start ou yarn start

# Que ver a documentação do projeto com swagger?
$ npm run dev ou yarn dev
```

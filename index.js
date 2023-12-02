//IMPORTAR MÓDULO EXPRESS
const express = require ("express");

//INSTANCIA DO MÓDULO EXPRESS
const app = express()

//CONFIGURAÇÃO DO EXPRESS PARA MANIPULAR JSON
app.use(express.json())

//CONFIGURAÇÃO DO EXPRESS PARA TRABALHAR COM DADOS DE FORMULÁRIO
app.use(express.urlencoded({extended: true}))

//IMPORTAR ARQUIVO DE MODEL DA TABELA DE CATEGORIA
const categoriaModel = require ("./model/Categoria")

//IMPORTAR ARQUIVO DE MODEL DA TABELA DE PRODUTO
const produtoModel = require ("./model/Produto")

//IMPORTAR CONTROLLER DE CATEGORIA
const categoriaController = require("./controller/Categoria")
app.use("/", categoriaController)

//IMPORTAR CONTROLLER DE PRODUTO
const produtoController = require("./controller/Produto")
app.use("/", produtoController)

//TESTE DE CONEXÃO
const connection = require("./database/database");
console.log(connection);

//CRIAR SERVIDOR WEB DE REQUISIÇÕES E RESPOSTAS
app.listen(3000, ()=>{
    console.log('API ATIVIDADE RODANDO EM: https://localhost:3000');
});
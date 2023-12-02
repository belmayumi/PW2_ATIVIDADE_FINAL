//IMPORTAR MÓDULO DO SEQUELIZE
const sequelize = require("sequelize");

//IMPORTAR CONEXÃO COM O BANCO DE DADOS
const connection = require ("../database/database");

//CRIAR TABELA CATEGORIA
const Categoria = connection.define(
    'tbl_categoria',
    {
        codigo_categoria: {
            type: sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nome_categoria: {
            type: sequelize.STRING(255),
            allowNull: false
        },
        observacoes_categoria: {
            type: sequelize.TEXT,
            allowNull: false
        },
    }, 
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt:false
    }
);

//SINCRONIZAÇÃO COM O BANCO DE DADOS - CRIA A TABELA CASO ESSA NÃO EXISTA

Categoria.sync({force: false});

module.exports = Categoria;
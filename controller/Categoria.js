// IMPORTAR O EXPRESS
const express = require('express');
const categoriaModel = require('../model/Categoria');
const router = express.Router();

// ROTA POST PARA CADASTRAR A CATEGORIA
router.post("/categoria/cadastrarCategoria", (req, res) => {
    let { nome_categoria, observacoes_categoria } = req.body;

    categoriaModel
        .create({ nome_categoria, observacoes_categoria })
        .then(() => {
            return res.status(200).json({
                errorStatus: false,
                messageStatus: "Categoria cadastrada com sucesso!",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error,
            });
        });
});

// ROTA GET PARA LISTAR A CATEGORIA
router.get("/categoria/listarCategoria", (req, res) => {
    categoriaModel
        .findAll()
        .then((tbl_categoria) => {
            return res.status(200).json(tbl_categoria);
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error,
            });
        });
});

// ROTA PUT PARA ALTERAR A CATEGORIA
router.put("/categoria/alterarCategoria/:codigo_categoria", (req, res) => {
    let { codigo_categoria } = req.params;

    let { nome_categoria, observacoes_categoria } = req.body;

    categoriaModel
        .update(
            { nome_categoria, observacoes_categoria },
            { where: { codigo_categoria } }
        )
        .then(() => {
            return res.status(200).json({
                errorStatus: false,
                messageStatus: "Categoria alterada com sucesso!",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error,
            });
        });
});

// ROTA DELETE PARA EXCLUIR A CATEGORIA
router.delete("/categoria/excluirCategoria/:codigo_categoria", (req, res) => {
    let { codigo_categoria } = req.params;

    categoriaModel
        .destroy({ where: { codigo_categoria } })
        .then(() => {
            return res.status(200).json({
                errorStatus: false,
                messageStatus: "Categoria excluída com sucesso!",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error,
            });
        });
});

// EXPORTAR O ROUTER
module.exports = router;
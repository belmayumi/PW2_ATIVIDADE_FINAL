const { initializeApp } = require("firebase/app");
const {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytes,
    listAll,
    deleteObject,
} = require("firebase/storage");

// IMPORTAR O EXPRESS
const express = require('express');
const produtoModel = require('../model/Produto');
const router = express.Router();

const upload = require("../helpers/upload/uploadImagem");
const deleteImage = require("../helpers/upload/deleteImagem");

const firebaseConfig = {
    apiKey: "AIzaSyAPT7NvTXGltWtJ9XeEIi3gt72k02UW8nk",
    authDomain: "upload-nodejs-16bee.firebaseapp.com",
    projectId: "upload-nodejs-16bee",
    storageBucket: "upload-nodejs-16bee.appspot.com",
    messagingSenderId: "619413756182",
    appId: "1:619413756182:web:e0ae3631f31d5cb3f49837",
    measurementId: "G-8TBHC69S7C"
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

// ROTA POST PARA CADASTRAR O PRODUTO
router.post("/produto/cadastrarProduto", upload.single("file"), (req, res) => {
    const { nome_produto, valor_produto, descricao_produto, codigo_categoria } =
        req.body;

    const file = req.file;

    let imagem_produto;
    let imagem_produto_url;

    const fileName = Date.now().toString() + "-" + file.originalname;
    const fileRef = ref(storage, fileName);

    uploadBytes(fileRef, file.buffer).then((snapshot) => {
        imageRef = ref(storage, snapshot.metadata.name);
        getDownloadURL(imageRef).then((urlFinal) => {
            imagem_produto = fileName;
            imagem_produto_url = urlFinal;
            console.log("Nome da imagem: " + imagem_produto);
            console.log("URL da imagem: " + imagem_produto_url);

            if (imagem_produto) {
                produtoModel
                    .create({
                        nome_produto,
                        valor_produto,
                        imagem_produto,
                        imagem_produto_url,
                        descricao_produto,
                        codigo_categoria,
                    })
                    .then(() => {
                        return res.status(200).json({
                            errorStatus: false,
                            messageStatus: "Produto cadastrado com sucesso!",
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            errorStatus: true,
                            messageStatus: error,
                        });
                    });
            }
        });
    });
});

// ROTA GET PARA LISTAR O PRODUTO
router.get("/produto/listarProduto", (req, res) => {
    produtoModel
        .findAll()
        .then((tbl_produtos) => {
            return res.status(200).json(tbl_produtos);
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error,
            });
        });
});

router.get("/produto/listarProduto/:codigo_produto", (req, res) => {
    let { codigo_produto } = req.params;

    produtoModel
        .findByPk(codigo_produto)
        .then((tbl_produtos) => {
            return res.status(200).json(tbl_produtos);
        })
        .catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro,
            });
        });
});

// ROTA PUT PARA ALTERAR O PRODUTO
router.put('/produto/alterarProduto', (req, res) => {
    res.send('Produto alterado com sucesso');
});

router.delete("/produto/excluirProduto/:codigo_produto", (req, res) => {
    let { codigo_produto } = req.params;

    produtoModel.findByPk(codigo_produto).then((tbl_produtos) => {
        deleteImage(tbl_produtos.imagem_produto);
        tbl_produtos
            .destroy({
                where: { codigo_produto },
            })
            .then(() => {
                return res.status(200).json({
                    errorStatus: false,
                    messageStatus: "Produto excluído com sucesso!",
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    errorStatus: true,
                    messageStatus: error,
                });
            });
    });
});
// EXPORTAR O ROUTER
module.exports = router;
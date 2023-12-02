const { initializeApp } = require("firebase/app");
const { getStorage, ref, deleteObject } = require("firebase/storage");

/* DADOS DE ACESSO AO FIREBASE */
const firebaseConfig = {
    apiKey: "AIzaSyAPT7NvTXGltWtJ9XeEIi3gt72k02UW8nk",
    authDomain: "upload-nodejs-16bee.firebaseapp.com",
    projectId: "upload-nodejs-16bee",
    storageBucket: "upload-nodejs-16bee.appspot.com",
    messagingSenderId: "619413756182",
    appId: "1:619413756182:web:e0ae3631f31d5cb3f49837",
    measurementId: "G-8TBHC69S7C"
  };

/* INICIALIZAÇÃO DO FIREBASE */
const firebaseApp = initializeApp(firebaseConfig);

/* INICIALIZAÇÃO DO STORAGE DO FIREBASE */
const storage = getStorage(firebaseApp);

const deleteImage = (imagem) => {
    const deleteRef = ref(storage, imagem);

    deleteObject(deleteRef)
        .then(() => {
            console.log("Imagem excluída com sucesso!");
        })
        .catch((error) => {
            console.log("Erro ao excluir a imagem!");
        });
};

module.exports = deleteImage;
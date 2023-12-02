const multer = require("multer");

// CONFIGURAÇÃO DO MULTER
// TIPOS DE ARQUIVOS PERMITIDOS
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// DEFINIÇÃO DE USO DO MULTER
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MEGABYTE
    },
    fileFilter: fileFilter,
});

module.exports = upload;
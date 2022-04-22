require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');

const app = express();

app.use(cors());

const helperImg = (filePath, filename, size = 300) => {
  return sharp(filePath)
        .resize(size)
        .toFile(`./optimize/${filename}`)
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads')
  },
  filename: (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    callback(null, `${Date.now()}.${extension}`)
  }
})

const upload = multer({storage: storage})

app.post('/upload', upload.single('file'), (req, res) => {
  helperImg(req.file.path, `resize-${req.file.filename}`, 100)
  res.send({data: 'Imagen cargada'})
})

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto ${process.env.PORT}`);
})
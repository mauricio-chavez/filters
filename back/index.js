const express = require('express');
const cors = require('cors');
const Filter = require('node-image-filter');
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");
const app = express();

let counter = 0;

rimraf("/temp", function () {
  console.log("Directory temp/ has been removed");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './temp');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

app.use(cors());
const upload = multer({
  storage
})

app.post('/filter', upload.single('image'), function (req, res) {
  Filter.render(req.file.path, Filter.preset.invert, function (result) {
    let filename = `${counter++}.${result.type}`;
    result.data.pipe(fs.createWriteStream(`img/${filename}`));
    res.send({
      filename
    });
  });
});

app.get('/image/:filename', (req, res) => {
  let filename = req.params.filename;
  let pathname = path.join(__dirname, 'img', filename);
  res.sendFile(pathname);
});

const server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
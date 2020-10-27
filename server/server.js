const fs = require('fs');
const express = require('express');

const app = express();

const goReadFile = (path, options) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

app.get('/students', (req, res) => {
  goReadFile('./cleanedStudents.json', { encoding: 'utf-8' })
    .then((data) => {
      res.json(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500);
      res.json({ error: { message: err.message, details: err } });
    });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server listenting on port ${PORT}`); // eslint-disable-line
});

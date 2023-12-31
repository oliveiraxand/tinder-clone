const express = require('express');

const PORT = 8000;

const app = express()

app.get('/', (req, res) => {
  res.json('My app is up');
})

app.listen(PORT, () => {
  console.log('Server is running on PORT: %s', PORT)
})
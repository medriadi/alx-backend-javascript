const express = require('express');

const PORT = 7865;
const app = express();

app.get('/', (_req, res) => {
  res.status(200).send('Welcome to the payment system');
});

app.listen(PORT, () => {
  console.log(`API available on localhost port ${PORT}`);
});

module.exports = app;
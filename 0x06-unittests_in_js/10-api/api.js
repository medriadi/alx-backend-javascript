const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

// Cart route with :id validation (only numbers allowed)
app.get('/cart/:id([0-9]+)', (req, res) => {
  const cartId = req.params.id;
  res.send(`Payment methods for cart ${cartId}`);
});

// Handle invalid cart IDs (non-numeric)
app.get('/cart/:id', (req, res) => {
  res.status(404).send('Cannot GET /cart/:id');
});

// GET /available_payments route
app.get('/available_payments', (req, res) => {
  res.json({
    payment_methods: {
      credit_cards: true,
      paypal: false,
    },
  });
});

// POST /login route
app.post('/login', (req, res) => {
  const userName = req.body.userName;
  if (!userName) {
    res.status(400).send('Bad Request');
  } else {
    res.send(`Welcome ${userName}`);
  }
});

// Start the server
app.listen(7865, () => {
  console.log('API available on localhost port 7865');
});

module.exports = app;

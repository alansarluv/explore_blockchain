const express = require('express');
const app = express();
const Blockchain = require('./blockchain');

const nuCoin = new Blockchain();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// API for create new block
app.get('/blockchain', function (req, res) {
  res.send(nuCoin);
});

// API for create new transaction
app.post('/transaction', function (req, res) {
  const blockIndex = nuCoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});

// API for mining
app.get('/mine', function (req, res) {

});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

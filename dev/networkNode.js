const express = require('express');
const app = express();
const Blockchain = require('./blockchain');
const uuid = require('uuid').v1; // create unique random strings
const port = process.argv[2]; // to fetch element number 3 in package.json npm start ==> 3001 

const nodeAddress = uuid().split('-').join(''); // remove -- if any

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
  const lastBlock = nuCoin.getLastBlock();
  const prevBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: nuCoin.pendingTransaction,
    index: lastBlock['index'] + 1
  }
  const nonce = nuCoin.proofOfWork(prevBlockHash, currentBlockData);
  const blockHash = nuCoin.hashBlock(prevBlockHash, currentBlockData, nonce);

  nuCoin.createNewTransaction(12.5, "00", nodeAddress); // rewards for minning coin

  const newBlock = nuCoin.createNewBlock(nonce, prevBlockHash, blockHash);
  res.json({
    note: "New block mined successfully",
    block: newBlock
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

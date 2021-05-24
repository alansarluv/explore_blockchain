const sha256 = require('sha256');
// constructor
function Blockchain() {
  this.chain = [];
  this.pendingTransaction = [];
}

// =============== ================== =============== method lists =============== ================== ===============

// create new block method
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timeStamp: Date.now(),
    transactions: this.pendingTransaction,
    nonce: nonce, // should be number from proof of work
    hash: hash,
    previousBlockHash: previousBlockHash,
  };

  this.pendingTransaction = [];
  this.chain.push(newBlock);
  return newBlock;
};

// get last chain method
Blockchain.prototype.getLastBlock = function() {
  return this.chain[this.chain.length - 1];
};

// create new trx method
Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
  const pendingTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient
  };

  this.pendingTransaction.push(pendingTransaction);
  return this.getLastBlock()['index'] + 1; // return the latest mined block
};


// create hash method for new block
Blockchain.prototype.hashBlock =  function(previousBlockHash, currentBlockData, nonce) {
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
};



module.exports = Blockchain;

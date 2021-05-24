const sha256 = require('sha256');
// constructor
function Blockchain() {
  this.chain = [];
  this.pendingTransaction = [];

  this.createNewBlock(911, '00', '00'); // you can just put random value here to create you very first block (called genesis block);
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

// create proof of work method
  // repeat hash block function until it finds correct hash (begin with 4 zero) ==> '0000XXXXXXXXX'
  // uses current block data also previousBlockHash
  // continuously changes nonce value until it finds the correct hash, you can start with 0
  // returns to use the nonce value that creates the correct hash

  // How this proof of work method can secure the blockchain ? since it using previousBlockHash, and calculate nonce until find 4 begin zero really need a lot of energy & a lot of computing power
  // so it won't be possible for someone to go back and change the data, especially when all the data is distributed anywhere on earth
Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0,4) != '0000') {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    console.log(hash);
  }
  return nonce;
};
// it takes a lot of work to generate proof of work, but it very easy to verify that the proof of work is correct
// so when you want to validate older chain, you only need to use correct nonce along with the previous hash & block data

module.exports = Blockchain;

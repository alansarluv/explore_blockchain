const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid').v1; // create unique random strings

// constructor
function Blockchain() {
  this.chain = [];
  this.pendingTransaction = [];

  this.currentNodeUrl = currentNodeUrl;
  this.networkNodes = [];

  this.createNewBlock(911, '0', '0'); // you can just put random value here to create you very first block (called genesis block);
};

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
  const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient,
    transactionId: uuid().split('-').join('') // remove -- if any
  };
  return newTransaction;
};

// add new transaction to pending transaction
Blockchain.prototype.addPendingTransaction = function(transactionObj) {
  this.pendingTransaction.push(transactionObj);
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

// validate chain
Blockchain.prototype.chainIsValid = function(blockchain) {
  let validChain = true;
  for (let i = 1; i < blockchain.length; i++) { // start loop on index 1 because index 0 is genesis block
    const currentBlock = blockchain[i];
    const prevBlock = blockchain[i-1];
    const blockHash = this.hashBlock(prevBlock['hash'], { transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nonce']);
    if (blockHash.substring(0, 4) !== '0000') validChain = false;
    if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
  };

  // validate genesis block
  const genesisBlock = blockchain[0];
  const correctNonce = genesisBlock['nonce'] === 911;
  const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
  const correctHash = genesisBlock['hash'] === '0';
  const correctTransactions = genesisBlock['transactions'].length === 0;
  if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

  return validChain;
};

// get block with blockHash
Blockchain.prototype.getBlock = function(blockHash) {
  let correctBlock = null;
  this.chain.forEach(block => {
    if (block['hash'] === blockHash) correctBlock = block;
  });
  return correctBlock;
};

// get transaction with transactionId
Blockchain.prototype.getTransaction = function(transactionId) {
  let correctTransaction = null;
  let correctBlock = null;
  this.chain.forEach(block => {
    block.transactions.forEach(transaction => {
      if (transaction['transactionId'] === transactionId) {
        correctTransaction = transaction;
        correctBlock = block;
      };
    });
  });
  return {
    transaction: correctTransaction,
    block: correctBlock
  };
};

// get address data with address
Blockchain.prototype.getAddressData = function(address) {
  const addressTransactions = [];
  this.chain.forEach(block => {
    block.transactions.forEach(transaction => {
      if (transaction.sender === address || transaction.recipient === address) {
        addressTransactions.push(transaction);
      }
    });
  });
  let balance = 0;
  addressTransactions.forEach(transaction => {
    if (transaction.recipient === address) balance += transaction.amount;
    else if (transaction.sender === address) balance -= transaction.amount;
  });
  return {
    addressTransactions: addressTransactions,
    addressBalance: balance
  }
};

module.exports = Blockchain;

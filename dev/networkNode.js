const express = require('express');
const app = express();
const Blockchain = require('./blockchain');
const uuid = require('uuid').v1; // create unique random strings
const port = process.argv[2]; // to fetch element number 3 in package.json npm start ==> 3001 
const rp = require('request-promise');

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
  const blockIndex = nuCoin.addPendingTransaction(req.body);
  res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});

// API for create new transaction broadcast
app.post('/transaction/broadcast', function (req, res) {
  const newTransaction = nuCoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  nuCoin.addPendingTransaction(newTransaction);
  const requestPromises = [];
  nuCoin.networkNodes.forEach(networkNodeURL => {
    const requestOptions = {
      uri: networkNodeURL + '/transaction',
      method: 'POST',
      body: newTransaction,
      json: true,
    };
    requestPromises.push(rp(requestOptions));
  });
  Promise.all(requestPromises)
  .then(data => {
    res.json({ note: `Transaction created and broadcast successfully.` });
  });
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
  const newBlock = nuCoin.createNewBlock(nonce, prevBlockHash, blockHash);

  const requestPromises = [];
  nuCoin.networkNodes.forEach(networkNodeURL => {
    const requestOptions = {
      uri: networkNodeURL + '/receive-new-block',
      method: 'POST',
      body: {newBlock: newBlock},
      json: true,
    };
    requestPromises.push(rp(requestOptions));
  });
  Promise.all(requestPromises)
  .then(data => {
    const requestOptions = {
      uri: nuCoin.currentNodeUrl + '/transaction/broadcast',
      method: 'POST',
      body: {
        amount: 12.5,
        sender: "00",
        recipient: nodeAddress,    
      },
      json: true,
    };
    return rp(requestOptions);
  })
  .then(data => {
    res.json({
      note: 'New block mined and broadcast successfully.',
      block: newBlock 
    });
  })
});

// this API used to receive and validate newBlock mined
app.post('/receive-new-block', function(req, res) {
  const newBlock = req.body.newBlock;
  const lastBlock = nuCoin.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.previousBlockHash;
  const correctIndex = lastBlock['index'] + 1 === newBlock['index'];
  if (correctHash && correctIndex) {
    nuCoin.chain.push(newBlock);
    nuCoin.pendingTransaction = [];
    res.json({
      note: 'New block received and accepted.',
      block: newBlock 
    });
  } else {
    res.json({
      note: 'New block rejected.',
      block: newBlock 
    });
  }
});

// this API used to register new node and broadcast it to all the node in network
app.post('/register-and-broadcast-node', function(req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  // add this new node to network lists if new node is not exist yet
  if (nuCoin.networkNodes.indexOf(newNodeUrl) === -1) nuCoin.networkNodes.push(newNodeUrl);

  const regNodePromises = [];
  // register new node in each of our network node lists
  nuCoin.networkNodes.forEach(networkNodeURL => {
    const requestOptions = {
      uri: networkNodeURL + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl},
      json: true,
    };
    // using requestOptions to make request new node to each node in network
    regNodePromises.push(rp(requestOptions)); // async so we don't know how long it will take
    // since rp is async and we don't know how much node in our network, so we push all promise in new array 'regNodePromises' 
    // and set promise.all to watch if all promise is done making request, then we can finally say all the request complete so we can run other operations.
  });

  Promise.all(regNodePromises)
    .then(data => {
      // if all good, then register all the network node to our new node using register-nodes-bulk
      const bulkRegisterOptions = {
        uri: newNodeUrl + '/register-nodes-bulk',
        method: 'POST',
        body: { allNetworkNodes: [...nuCoin.networkNodes, nuCoin.currentNodeUrl]},
        json: true,
      };
      return rp(bulkRegisterOptions);
    })
    .then(data => {
      res.json({note: 'New node registered with network successfully.'});
    });
});

// register a node with the network only (without broadcast it again)
// this API used to register new node only, and not re broadcast again.
app.post('/register-node', function(req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  // error handling if newNode is current node and if node already exists in network
  const nodeNotAlreadyPresent = nuCoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = nuCoin.currentNodeUrl !== newNodeUrl;
  if (nodeNotAlreadyPresent && notCurrentNode) nuCoin.networkNodes.push(newNodeUrl);
  res.json({note: 'New node registered successfully with node.'});
});

// register multiple nodes at once (without broadcast it again)
// this API is used to send for new join node after all the node install your node
app.post('/register-nodes-bulk', function(req, res) {
  const allNetworkNodes = req.body.allNetworkNodes;
  allNetworkNodes.forEach(networkNodeURL => {
    // error handling if newNode is current node and if node already exists in network
    const nodeNotAlreadyPresent = nuCoin.networkNodes.indexOf(networkNodeURL) == -1;
    const notCurrentNode = nuCoin.currentNodeUrl !== networkNodeURL;
    if (nodeNotAlreadyPresent && notCurrentNode) nuCoin.networkNodes.push(networkNodeURL);
  });
  res.json({note: 'Bulk registration success.'});
});


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const express = require('express')
const app = express()
 
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// API for create new block
app.get('/blockchain', function (req, res) {

});

// API for create new transaction
app.post('/transaction', function (req, res) {
  console.log(req.body);
  res.send(`The amount of the transaction is ${req.body.amount} bitcoin`);
});

// API for mining
app.get('/mine', function (req, res) {

});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

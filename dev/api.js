const express = require('express')
const app = express()
 
// API for create new block
app.get('/blockchain', function (req, res) {

});

// API for create new transaction
app.get('/transaction', function (req, res) {

});

// API for mining
app.get('/mine', function (req, res) {

});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
})
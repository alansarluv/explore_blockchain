const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello codes World')
})

app.listen(3000)
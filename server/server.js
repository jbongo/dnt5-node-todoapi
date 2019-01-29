const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');

var app = express();

// middleware décodant le json inclu dans le body des requêtes
app.use(bodyParser.json());

// routes

// POST /todos
app.post('/todos', (req, res) => {
  var todo = req.body;
  res.send(todo.text);
})


app.listen(3000, () => {
  console.log('Server écoutant le port 3000...');
})

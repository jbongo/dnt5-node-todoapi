const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');

var app = express();

// middleware décodant le json inclu dans le body des requêtes
app.use(bodyParser.json());

// routes
// https://httpstatuses.com/

// POST /todos
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(doc => {
    res.status(200).send(doc);
  }).catch(err => {
    res.status(400).send(err);
  })
})

// GET /todos
app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.status(200).send({todos});
  }).catch(err => {
    res.status(400).send(err);
  })
})

// GET /todos/id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  Todo.findById(id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch(err => {
    res.status(400).send(err);
  })
})

app.listen(3000, () => {
  console.log('Server écoutant le port 3000...');
})

module.exports = {app};


//

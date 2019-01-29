const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
  { text: 'Todo number 1'},
  { text: 'Todo number 2'}
];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
})

// describe permet des tests unitaires
describe('POST /todos', () => {

  it('doit créer un nouveau todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text)
      })
      .end(done);

  })

  it('ne doit pas créer un todo avec un body non valide', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end(done)
      ;
  })

});

describe('GET /todos', () => {
  it('doit recevoir tous les todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
})






//

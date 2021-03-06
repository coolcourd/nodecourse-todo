const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'second test todo',
  completed: true,
  completedAt: 333
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())

})

describe("Post /todos", () => {
  it("should create a new todo", (done) => {
    const text = "todo text"

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text)
    })
    .end((err, res) => {
      if (err) {
      return done(err)
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1)
        expect(todos[0].text).toBe(text)
        done()
      }).catch((e) => done(e))
    })
  })


  it("should not create todo with invalid data", (done) => {

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2)
        done()
      }).catch((e) => done(e))
    })
  })
})

describe('GET /todos', () => {
  it("should get all todos", (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2)
    })
    .end(done)
  })
})

describe("GET /todos/:id", () => {
  it("Should return a todo", (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done)
  })

  it("Should return a 404 if todo is not found", (done) => {
    request(app)
    .get(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done)
  })

  it("Should return a 404 if id is not valid", (done) => {
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done)
  })
})



describe("DELETE /todos/:id", () => {
  it("Should delete a todo and return it", (done) => {
    const hexId = todos[0]._id.toHexString()
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId)
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist()
        done()
      }).catch((e) => done())

    })
  })

  it("Should return a 404 if todo is not found", (done) => {
    request(app)
    .delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done)
  })

  it("Should return a 404 if id is not valid", (done) => {
    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done)
  })
})


describe("PATCH /todos/:id", () => {
  it("Should update a todo and return it", (done) => {
    const text = "updated it"
    const hexId = todos[0]._id.toHexString()
    request(app)
    .patch(`/todos/${hexId}`)
    .send({text, completed: true})
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text)
      expect(res.body.todo.completed).toBe(true)
      expect(res.body.todo.completedAt).toBeA("number")
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist()
        done()
      }).catch((e) => done())

    })
  })

  it("Should Clear completed at when todo is not finished", (done) => {
    const text = "updated it"
    const hexId = todos[1]._id.toHexString()
    request(app)
    .patch(`/todos/${hexId}`)
    .send({text, completed: false})
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text)
      expect(res.body.todo.completed).toBe(false)
      expect(res.body.todo.completedAt).toNotExist()
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist()
        done()
      }).catch((e) => done())

    })
  })

  it("Should return a 404 if todo is not found", (done) => {
    request(app)
    .patch(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done)
  })

  it("Should return a 404 if id is not valid", (done) => {
    request(app)
    .patch(`/todos/123`)
    .expect(404)
    .end(done)
  })
})

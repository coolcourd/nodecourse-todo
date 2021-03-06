require('./config/config')

const _ = require("lodash")
const {ObjectID} = require('mongodb')
const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')

const {mongoose} = require("./db/mongoose.js")
const {Todo} = require("./models/todo.js")
const {User} = require("./models/user.js")

const app = express()

const port = process.env.PORT

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PATCH, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
    })

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  })

  todo.save().then((response) => {
    res.send(response)
  }, (e)=> {
    res.status(400).send(e)
  })
})

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password'])
  const user = new User(body)

  user.save().then((user) => {
    res.send(user)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }), e => {
    res.status(400).send(e)
  }
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)){
    res.status(404).send("ID not Valid");
  }
  Todo.findById(id).then((todo) => {
    todo ? res.status(200).send({todo}) : res.status(404).send("Id not found")
  }).catch((e) => res.status(400).send(e))
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)){
    res.status(404).send("ID not Valid");
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    todo ? res.status(200).send({todo}) : res.status(404).send("Id not found")
  }).catch((e) => res.status(400).send(e))
})

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id
  const body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)){
    res.status(404).send("ID not Valid");
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    todo ? res.status(200).send({todo}) : res.status(404).send("Id not found")
  }).catch((e) => {
    res.status(400).send()
  })
})

//user

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
})

module.exports = {app}

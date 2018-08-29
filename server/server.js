const {ObjectID} = require('mongodb')
const express = require("express")
const bodyParser = require("body-parser")

const {mongoose} = require("./db/mongoose.js")
const {Todo} = require("./models/todo.js")
const {User} = require("./models/user.js")

const app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  })

  todo.save().then((response) => {
    res.send(response)
    console.log(`Todo saved successfully`, response);
  }, (e)=> {
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

app.listen(3000, () => {
  console.log(`server is up on port 3000. http://courd.hopto.org:3000`);
})

module.exports = {app}

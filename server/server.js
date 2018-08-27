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
    console.log("couldn't save todo", e);
  })
})

app.listen(3000, () => {
  console.log(`server is up on port 3000. http://courd.hopto.org:3000`);
})

module.exports = {app}

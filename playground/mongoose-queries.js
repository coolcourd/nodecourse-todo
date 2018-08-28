const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// const id = "5b8022911182340e5b2fb463"

// if (!ObjectID.isValid(id)){
//   console.log("ID not Valid");
// }
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("todos", todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log("todo", todo);
// })
//
// Todo.findById(id).then((todo) => {
//   todo ? console.log("todo by id", todo) : console.log("Id not found")
// }).catch((e) => console.log(e))


const id = "5b8022911182340e5b2fb463"

User.findById(id).then((user) => {
  user ? console.log(user) : console.log("Id not found")
}, (e) => {
  console.log(e)
})

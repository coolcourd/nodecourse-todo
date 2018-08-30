const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')


// Todo.remove({}).then((result) => {
//   console.log(result)
// })


// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

// Todo.findByIdAndRemove('5b874568b8508e7a02ee284a').then((todo) => {
//   console.log(todo)
// })

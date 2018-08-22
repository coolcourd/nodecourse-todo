const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://192.168.0.2:27017/TodoApp', (err, db) => {
    if (err) {
      return console.log("couldn't connect to mongodb server")
    }
    console.log('Connected to MongoDb server')

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("couldn't insert todo")
    //       }

    //       console.log(JSON.stringify(result.ops, undefined, 2))


    // })

    // db.collection('Users').insertOne({
    //     name: 'Courd',
    //     age: 28,
    //     location: "San Tan Valley"
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("couldnt insert user");
    //     }
    //     console.log(result.ops[0]._id.getTimestamp())
    // })

    db.close()
})

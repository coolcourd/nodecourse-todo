const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://192.168.0.2:27017/TodoApp', (err, db) => {
    if (err) {
      return console.log("couldn't connect to mongodb server")
    }

    db.collection('Users').find({name: "Courd"}).toArray().then((data) => {
      console.log(`todos: ${JSON.stringify(data, undefined, 2)}`)
    }, (err) => {
      console.log("unable to fetch todos",err)
    })

    db.close()
})

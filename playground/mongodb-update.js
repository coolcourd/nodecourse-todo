const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://192.168.0.2:27017/TodoApp', (err, db) => {
    if (err) {
      return console.log("couldn't connect to mongodb server")
    }
    console.log("connected to db");

    db.collection('Users').findOneAndUpdate({
      _id: ObjectID("5b79b5f601e2755cd1545465")
    }, {
      $set: {
        name: "Courd"
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    })

    // db.close()
})

const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://192.168.0.2:27017/TodoApp', (err, db) => {
    if (err) {
      return console.log("couldn't connect to mongodb server")
    }
    console.log("connected to db");

    //deleteMany

    // db.collection('Users').deleteMany({name: "Courd"}).then((result) => {
    //   console.log(result);
    // })

    //deleteOne

    // db.collection('Todos').deleteOne({text: "eat lunch"}).then((result) => {
    //   console.log(result);
    // })

    //findOneAndDelete

    db.collection('Users').findOneAndDelete({_id: ObjectID("5b7aee7ebaf41f3fa411ab93")}).then((result) => {
      console.log(result);
    })

    // db.close()
})

const { MongoClient, ObjectId } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to database');
        return;
    }

    const db = client.db(databaseName);

    // db.collection('tasks').updateMany({
    //     completed: true,
    // }, {
    //     $set: {
    //         completed: false,
    //     }
    // }).then((result)=>{
    //     console.log("success");
    // }).catch((error)=>{
    //     console.log("moderate succes");
    // })

    // db.collection('tasks').deleteMany({
    //     completed: false
    // }).then(console.log('Went right')).catch('went wrong');

    db.collection('users').deleteOne({
        _id: new ObjectId("61d3fac0da742420690387e1")
    }).then('Success').catch('no success')
})
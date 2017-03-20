var MongoClient = require('mongodb').MongoClient


 // Use connect method to connect to the Server 
MongoClient.connect('mongodb://localhost:27017/testdb', function(err, db) {


    // Find some documents 
    db.collection('machinelearnings').find({}).toArray(function(err, docs) {
        loopThroughObject(docs)
    })

});


function loopThroughObject(docs){
    console.log(docs[4].answer)
    // for (var i in docs){
    //     console.log(docs[0])
    // }
}
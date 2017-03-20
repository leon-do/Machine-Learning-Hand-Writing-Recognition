var MongoClient = require('mongodb').MongoClient
var assert = require('assert');


 // Use connect method to connect to the Server 
MongoClient.connect('mongodb://localhost:27017/testdb', function(err, db) {


    // Find some documents 
    db.collection('machinelearnings').find({}).toArray(function(err, docs) {
        console.dir(docs[0][0]);
    })

});



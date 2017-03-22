var MongoClient = require('mongodb').MongoClient
 
MongoClient.connect('mongodb://mlab-leon:passwund@ds137360.mlab.com:37360/mlab-leon-db', function(err, db) {
    // Find some documents 
    db.collection('machineLearningCollection').find({}).toArray(function(err, docs) {
        console.log(docs)
    })
});



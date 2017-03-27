var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://ds137360.mlab.com:37360/mlab-leon-db', function(err, db) {
    db.authenticate('mlab-leon', 'passwund', function(){
        // Find some documents 
        db.collection('machinelearnings').find({}).toArray(function(err, docs) {
            console.log(docs)
        })
    })

});
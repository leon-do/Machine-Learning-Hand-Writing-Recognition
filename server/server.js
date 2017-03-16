var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded ({ extended:true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + "/../client"));


app.post('/base64', function (req, res){
    console.log(req.body)
})

app.listen(8000)
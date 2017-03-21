var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path');
var myBase64 = require('./server/base64Img.js')



app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded ({ extended:true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + "/client"));

//send base64 sting to base64.js
app.post('/api/base64', function (req, res){
    //console.log(req.body)
    var base64Data = req.body;
    //send base64 to base64img.js
    myBase64.base64toImg(base64Data);
})

app.get('/hello', function (req, res) {res.send("hello world")})

app.listen(8000)
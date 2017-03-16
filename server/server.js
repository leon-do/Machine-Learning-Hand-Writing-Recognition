var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded ({ extended:true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/index.html"))
})


app.post('/base64', function (req, res){
    console.log(req.body)
})

app.listen(8000)
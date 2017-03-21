var express = require('express')
var app = express()

app.get('/api', function(req,res){res.send({sdfsdf: 234})})

app.listen(8000)
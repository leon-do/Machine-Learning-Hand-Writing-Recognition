// https://www.npmjs.com/package/mnist
// this adds data to mongodb


var mnist = require('mnist');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdb');
var myModel = mongoose.model("machinelearning", {input:Array, output:String})



// create 2000 traning data
// set.tranining, set.test
var set = mnist.set(2000, 0);


// add mnist to mongoose
for (var i = 0; i< 2000; i++){
    myModel({
        input: set.training[i].input, 
        output: set.training[i].output.indexOf(1)
    }).save()
}


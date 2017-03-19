var myData = require('../data/myData.js')


var data = myData.array
console.log(data[0])

var shortestDistance = Infinity;
var index;

for (var i = 0; i < data.length; i++){

    console.log('EUCLIDEAN DISTANCE')
    console.log(euclideanDistance(data[i].splice(1),flatArray))

    if (shortestDistance > euclideanDistance(data[i].splice(1),flatArray)){
        shortestDistance = euclideanDistance(data[i].splice(1),flatArray);
        index = i;
    }

}
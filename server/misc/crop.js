/*
converts 
1,2,3,4,5,6,7,8,9,10 
to
1,5,6,7,8,9,10,2,3,4
aka
shifts blank 0's to the bottom
*/


var fs = require('fs')

var rawArr = [
//array here
]



for (var row = 0; row < rawArr.length; row++){
    for (var i = 1; i < rawArr[row].length; i++){
        if (rawArr[row][i] === 1){
            var top = Math.floor(i / 28) * 28;
            break;
        }
    }

    var midArr = rawArr[row].slice(1,top) //2,3,4
    var tailArr = rawArr[row].slice(top, rawArr[row].length) //5,6,7,8,9,10
    var finalRow = [rawArr[row][0]].concat(tailArr).concat(midArr) // [ 1, 5, 6, 7, 8, 9, 10, 2, 3, 4 ]
    fs.appendFile("write2.txt", finalRow + '\n', 'utf8')
}



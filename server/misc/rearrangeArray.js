var arr = [1,2,3,4,5,6,7,8,9,10]

var midArr = arr.slice(1,4) //2,3,4

var tailArr = arr.slice(4, arr.length) //5,6,7,8,9,10


var finalArr = [arr[0]].concat(tailArr).concat(midArr) // [ 1, 5, 6, 7, 8, 9, 10, 2, 3, 4 ]

console.log(finalArr)
//https://medium.com/@mackplevine/node-js-get-pixels-getting-pixels-at-specific-sectors-of-an-image-using-ndarray-e6d4cb285d36#.dtfjwibcz
var base64Img = require('base64-img');
var Jimp = require("jimp");
var getPixels = require('get-pixels');
var mongoose = require('mongoose');
var fs = require('fs')
var myData = require('./data/myData.js')

mongoose.connect('mongodb://localhost/testdb');
var myModel = mongoose.model("machinelearning", {input:Array, output:String})



exports.base64toImg = function(base64Data){
    console.log('\n\n\n BASE64 TO IMG')
    console.log(base64Data)
    //creates image from base64. saves it in img/screenshot.png
    base64Img.img(base64Data.base64, './server/img', 'screenshotFull', function(err, filepath) {
       // console.log(filepath)
        resizeImage()
    });
}


function resizeImage(){
    // open a file called "screenshot.png"
    Jimp.read(__dirname + "/img/screenshotFull.png", function (err, image) {
        if (err) throw err;
        image.resize(28, 28)                                         // resize image
             .greyscale()                                            // set greyscale
             .write(__dirname + "/img/screenshotMin.png");     // save
        flattenImg()             
    })
}



function flattenImg(){
    getPixels(__dirname + '/img/screenshotMin.png', function(err, pixels){

        var binaryArray = [];
        //convert to 1 and 0
        for (var i = 3; i < pixels.data.length; i=i+4){
            if (pixels.data[i] === 0){
                binaryArray.push(0)
            } else {
                binaryArray.push(1)
            }
        }

        console.log("\n\n\n FLATTEN IMG")
        console.log(binaryArray)
        cropArray(binaryArray)
    }) 
}


function cropArray(arr){
    console.log("\n\n\n CROP ARRAY")
    console.log(arr)
    //put the 0's at the tail end
    for (var i = 1; i < arr.length; i++){
        if (arr[i] === 1){
            var top = Math.floor(i / 28) * 28;
            break;
        }
    }

    var midArr = arr.slice(1,top) //2,3,4
    var tailArr = arr.slice(top, arr.length) //5,6,7,8,9,10
    //swap the tail and mid arrays. keep index 0 the same
    var flatArray = [arr[0]].concat(tailArr).concat(midArr) // [ 1, 5, 6, 7, 8, 9, 10, 2, 3, 4 ]
    
    //flat array is the text array after being cropped
    controlArray(flatArray)
}


function controlArray(flatArray){
    console.log('\n\n\n FLAT ARRAY')
    console.log(flatArray)

    //data is from ./data/myData.js
    var data = myData.array


    // push distances into euclideaArray
    var euclideanArray =  [];    
    for (var i = 0; i < data.length; i++){
        console.log(euclideanDistance(data[i].splice(1),flatArray))
        euclideanArray.push(euclideanDistance(data[i].splice(1),flatArray))
    }

    console.log('\n\n EUCLIDEAN ARRAY')
    console.log(euclideanArray)

    //gets the index with the smallest number (distance)
    var index = euclideanArray.indexOf(Math.min.apply(Math,euclideanArray))

    //displays answer with shortest distance
    var answer = data[index];
   // console.log(`Answer: ${answer}`)

}







function euclideanDistance(arr1, arr2){
    var answer = Math.pow(arr2.map(function(a,i){ 
        return Math.pow(arr1[i] - arr2[i], 2);
    }).reduce(function(a,b){
        return a+b;
    }),0.5)

    return answer;
}





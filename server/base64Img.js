//https://medium.com/@mackplevine/node-js-get-pixels-getting-pixels-at-specific-sectors-of-an-image-using-ndarray-e6d4cb285d36#.dtfjwibcz
var base64Img = require('base64-img');
var Jimp = require("jimp");
var getPixels = require('get-pixels');
var MongoClient = require('mongodb').MongoClient
var fs = require('fs')




exports.base64toImg = function(base64Data){
    console.log('\n\n\n BASE64 TO IMG')
    console.log(base64Data)

    //creates image from base64. saves it in img/screenshot.png
    base64Img.imgSync(base64Data.base64, './server/img', 'screenshotFull')
    resizeImage()
}


function resizeImage(){
    // open a file called "screenshot.png"
    Jimp.read(__dirname + "/img/screenshotFull.png", function (err, image) {
        if (err) throw err;
        image.resize(28, 28)                                         // resize image
            .greyscale()                                            // set greyscale
            .write(__dirname + "/img/screenshotMin.png", function(){ //save
                flattenImg()  
            });
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
fs.writeFile('flatten.txt', binaryArray, 'utf8')
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
    queryMongo(flatArray)
}





function queryMongo(testArr){
    MongoClient.connect('mongodb://mlab-leon:passwund@ds137360.mlab.com:37360/mlab-leon-db', function(err, db) {
        // Find some documents 
        db.collection('machineLearningCollection').find({}).toArray(function(err, docs) {
            getAnswer(testArr,docs)
        })
    });
}







function getAnswer(testArr, controlArr){

    //controlArr is the from the db
    //testArr is what the user inputs in

    //create an arr to store distance
    var distanceArr = [];


    for (var i in controlArr){
        var distance = euclideanDistance(controlArr[i].arr, testArr)
        distanceArr.push(distance)
    }





    //list if distances
    console.log('\n\n DISTANCE ARRAY')
    console.log(distanceArr)

    //find the index of the smallest distance
    var shortestDistanceIndex = distanceArr.indexOf(Math.min.apply(Math,distanceArr))


    //displays flatArray (user array) on console
    console.log('\n\n TEST VISUAL')
    visual(testArr)


    //display Control Image
    console.log('\n\n CONTROL VISUAL')
    visual(controlArr[shortestDistanceIndex].arr)

    //answer
    console.log(`Answer: ${controlArr[shortestDistanceIndex].answer}`)
}









function euclideanDistance(arr1, arr2){
    var answer = Math.pow(arr2.map(function(a,i){ 
        return Math.pow(arr1[i] - arr2[i], 2);
    }).reduce(function(a,b){
        return a+b;
    }),0.5)

    return answer;
}




function visual(arr){
    // see image on console as 1 and 0's
    for (var i = 0; i < arr.length; i=i+28){
        console.log(`${arr[i+0]} ${arr[i+1]} ${arr[i+2]} ${arr[i+3]} ${arr[i+4]} ${arr[i+5]} ${arr[i+6]} ${arr[i+7]} ${arr[i+8]} ${arr[i+9]} ${arr[i+10]} ${arr[i+11]} ${arr[i+12]} ${arr[i+13]} ${arr[i+14]} ${arr[i+15]} ${arr[i+16]} ${arr[i+17]} ${arr[i+18]} ${arr[i+19]} ${arr[i+20]} ${arr[i+21]} ${arr[i+22]} ${arr[i+23]} ${arr[i+24]} ${arr[i+25]} ${arr[i+26]} ${arr[i+27]}`)
    }
}





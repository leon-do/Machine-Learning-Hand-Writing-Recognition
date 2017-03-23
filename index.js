var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path');
var base64Img = require('base64-img');
var Jimp = require("jimp");
var getPixels = require('get-pixels');
var MongoClient = require('mongodb').MongoClient
var fs = require('fs')



app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded ({ extended:true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + "/client"));





//send base64
app.post('/api/base64', function (req, res){



    //console.log(req.body)
    var base64Data = req.body;
    //send base64 to base64img.js
    base64toImg(base64Data)




    function base64toImg (base64Data){
        console.log('\n\n\n BASE64 TO IMG')
        console.log(shitty)
        app.get('/base64toImg', function (req, res) {res.send(base64Data)})


        //creates image from base64. saves it in img/screenshot.png
        base64Img.imgSync(base64Data.base64, './server/img', 'screenshotFull')
        resizeImage()

    }





    function resizeImage(){
        // open a file called "screenshot.png"
        Jimp.read(__dirname + '/server/img/screenshotFull.png', function (err, image) {
            console.log("\n\n\n\n\n" + __dirname + "\n\n\n\n\n")
            if (err) throw err;
            image.resize(28, 28)                                         // resize image
                .greyscale()                                            // set greyscale
                .write(__dirname + "/server/img/screenshotMin.png", function(){ //save
                    flattenImg()  
                });
        })
    }



    function flattenImg(){
        getPixels('./server/img/screenshotMin.png', function(err, pixels){

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
        app.get('/cropArray', function (req, res) {res.send(arr)})

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
        MongoClient.connect('mongodb://localhost:27017/testdb', function(err, db) {
            // Find some documents 
            db.collection('machinelearnings').find({}).toArray(function(err, docs) {
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





        //list of distances
        console.log('\n\n DISTANCE ARRAY')
        console.log(distanceArr)
        app.get('/getAnswer/distanceArr', function (req, res) {res.send(distanceArr)})


        //find the index of the smallest distance
        var shortestDistanceIndex = distanceArr.indexOf(Math.min.apply(Math,distanceArr))


        //displays flatArray (user array) on console
        console.log('\n\n TEST VISUAL')
        app.get('/getAnswer/test', function (req, res) {res.send(testArr)})


        //display Control Image
        console.log('\n\n CONTROL VISUAL')
        app.get('/getAnswer/control', function (req, res) {res.send(controlArr[shortestDistanceIndex].arr)})


        //answer
        console.log(`Answer: ${controlArr[shortestDistanceIndex].answer}`)
        app.get('/getAnswer/Answer', function (req, res) {res.send(JSON.stringify(controlArr[shortestDistanceIndex].answer))})






        res.end(); //send data back to angular
        



    }//get answers









    function euclideanDistance(arr1, arr2){
        var answer = Math.pow(arr2.map(function(a,i){ 
            return Math.pow(arr1[i] - arr2[i], 2);
        }).reduce(function(a,b){
            return a+b;
        }),0.5)

        return answer;
    }





        

    


});



app.listen(8000)
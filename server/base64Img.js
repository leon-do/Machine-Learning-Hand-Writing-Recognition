var base64Img = require('base64-img');
var Jimp = require("jimp");





exports.base64toImg = function(base64Data){
    //creates image from base64. saves it in img/screenshot.png
    base64Img.img(base64Data.base64, 'img', 'screenshotFull', function(err, filepath) {
        console.log(filepath)
        resizeImage()
    });
}


function resizeImage(){

    // open a file called "shit.png"
    Jimp.read("img/screenshotFull.png", function (err, image) {
        if (err) throw err;
        image.resize(28, 28)                // resize
             .greyscale()                   // set greyscale
             .write("./img/screenshotMin.png");   // save
    });
}
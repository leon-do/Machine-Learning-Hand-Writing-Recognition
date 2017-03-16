//https://medium.com/@mackplevine/node-js-get-pixels-getting-pixels-at-specific-sectors-of-an-image-using-ndarray-e6d4cb285d36#.dtfjwibcz

var getPixels = require('get-pixels');



getPixels('./img.png', function(err, pixels){
    var flatArray = [];

    for (var i = 3; i < pixels.data.length; i=i+4){
            flatArray.push(pixels.data[i] / 255)
    }

    console.log(flatArray)

}) 



var Jimp = require("jimp");

// open a file called "shit.png"
Jimp.read("shit.png", function (err, image) {
    if (err) throw err;
    image.resize(28, 28)            // resize
         .greyscale()                 // set greyscale
         .write("img.png"); // save
});
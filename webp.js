const imagemin = require("imagemin"), // The imagemin module.
  webp = require("imagemin-webp"), // imagemin's WebP plugin.
  outputFolder = "./src/webpimg", // Output folder
  PNGImages = "./img/*.png", // PNG images
  JPEGImages = "./src/images/*.jpg"; // JPEG images

imagemin([PNGImages], outputFolder, {
  plugins: [
    webp({
      lossless: true // Losslessly encode images
    })
  ]
});

imagemin([JPEGImages], outputFolder, {
  plugins: [
    webp({
      quality: 65 // Quality setting from 0 to 100
    })
  ]
});

const multer = require("multer");
//images can be stored in buckets and their link can be stored in the db also
const proImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/product-images");
    },
    filename: function (req, file, callback) {
      callback(null, "product_image-" + Date.now() + ".jpeg");
    },
  });
  const productPicStore = multer({ storage : proImageStorage })
  module.exports = productPicStore
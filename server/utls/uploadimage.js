const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, callback) => {

        callback(null, __basedir + "/public/image");
    },
    filename: (req, file, callback) => {
        if (!file.mimetype.startsWith("image")) {
            let errorMess = "Chỉ cho phép upload hình ảnh";
            return callback(errorMess, null);
        }
        let filename = Date.now().toString() + "_" + file.originalname;
        callback(null, filename);
    }
});

var uploadFile = multer({ storage: storage });
module.exports = uploadFile;
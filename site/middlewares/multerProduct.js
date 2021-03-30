const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'public/images/productos');
    },
    filename : (req,file,cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Solo admite formato .png, .jpg .jpeg .gif'));
        }
      }
});

module.exports = upload;
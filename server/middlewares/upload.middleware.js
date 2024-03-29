const multer = require('multer')
const path = require('path')

// Multer setup to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/assets') // Destination folder for uploaded files (relative to app.jsx not this file)
  },
  filename: function (req, file, cb) {
    // if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    //   return cb(new Error('Only image files are allowed!'), false)
    // }
    if (file.mimetype.startsWith('image')) {
      cb(null, file.originalname); // Keep the original file name
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  }
});

const upload = multer({ storage: storage })

module.exports = upload

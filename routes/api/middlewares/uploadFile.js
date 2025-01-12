const multer = require('multer');
const { TEMP_DIR } = require('../../../contants/constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString();
    cb(null, timestamp + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
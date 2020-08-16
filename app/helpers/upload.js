const multer = require("multer");

// set storage multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/images");
  },
  filename: function (req, file, cb) {
    const splitName = file.originalname.split(".");
    const ext = splitName.pop();
    const newName = splitName.join("-");
    cb(null, `${newName}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

module.exports = upload;

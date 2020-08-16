const multer = require("multer");

// set storage multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/images");
  },
  filename: function (req, file, cb) {
    const splitName = file.originalname.split(".");
    const ext = splitName.pop();
    const titleName = req.body.title.split(" ").join("-");
    cb(null, `${titleName}-${Date.now()}.${ext}`);
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
    req.fileValidationError = "Only .jpeg, .jpg and .png images allowed!";
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

module.exports = upload;

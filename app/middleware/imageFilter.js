const upload = require("../helpers/upload");
const { response } = require("../helpers/myResponse");
const imageFilter = upload.single("image");

module.exports = (req, res, next) => {
  try {
    imageFilter(req, res, (error) => {
      if (error) {
        return response(res, "fail", `${error.message} max 4 mb`, 400);
      }
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

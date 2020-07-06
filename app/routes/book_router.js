const express = require("express");
const router = express.Router();
const bookController = require("../controllers/controller_book");
const upload = require("../helpers/upload");
const {
  is_Admin,
  is_User,
  is_Staff,
} = require("../middleware/auth_middleware");
const { none } = require("../helpers/upload");

router.get("/", is_User, bookController.showAllBooks);
router.get("/:id", is_User, bookController.getBookDetail);
router.get("/history/:id", is_User, bookController.showHistoryByUserId);
router.post("/", is_Staff, upload.single("image"), bookController.addBooks);
router.put(
  "/:id",
  is_Staff,
  upload.single("image"),
  bookController.updateBooks
);
router.put("/borrow/:id", upload.none(), is_User, bookController.borrowBooks);
router.put("/return/:id", upload.none(), is_User, bookController.returnBooks);
router.delete("/:id", is_Admin, bookController.deleteBooks);

module.exports = router;

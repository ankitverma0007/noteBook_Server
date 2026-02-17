const express = require("express");
const authMiddleWare = require("../middleWare/authMiddleWare");
const router = express.Router();

const {
  read,
  write,
  deleteNote,
  update,
} = require("../controllers/Operations");

router.get("/", authMiddleWare, read);
router.post("/", authMiddleWare, write);
router.delete("/:id", authMiddleWare, deleteNote);
router.put("/:id", authMiddleWare, update);

module.exports = router;

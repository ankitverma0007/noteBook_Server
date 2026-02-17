const express = require("express");
const authMiddleWare = require("../middleWare/authMiddleWare");
const router = express.Router();

const {
  read,
  write,
  deleteTask,
  update,
} = require("../controllers/taskOprations");

router.get("/", authMiddleWare, read);
router.post("/", authMiddleWare, write);
router.delete("/:id", authMiddleWare, deleteTask);
router.put("/:id", authMiddleWare, update);

module.exports = router;

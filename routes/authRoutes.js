const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    changePass,
    deleteAcc,
    deleteAllNotes,
} = require("../controllers/auth");
const authMiddleWare = require("../middleWare/authMiddleWare");

router.post("/signup", signup);
router.post("/login", login);
router.post("/changePass", authMiddleWare, changePass);
router.post("/deleteAcc", authMiddleWare, deleteAcc);
router.post("/deleteAllNotes",authMiddleWare, deleteAllNotes);

module.exports = router;
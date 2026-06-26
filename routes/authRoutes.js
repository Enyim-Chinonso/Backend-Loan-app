const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { applyForLoan } = require("../controllers/loanController");

const { registerUser, loginUser } = require("../controllers/authController");


router.post("/register", registerUser);

router.post("/login", loginUser)

router.post("/apply",  protect, applyForLoan);



router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});

module.exports = router;

const express = require("express");

const router = express.Router();

const { applyForLoan, getMyLoans, repayLoan } = require("../controllers/loanController");

const protect = require("../middleware/authMiddleware");

// Apply for a loan
router.post("/apply", protect, applyForLoan );

router.get("/my-loans", protect, getMyLoans );

router.patch("/:id/repay", protect, repayLoan );

module.exports = router;
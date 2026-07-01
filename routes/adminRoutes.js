const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getAllLoans,
  approveLoan,
  rejectLoan
} = require("../controllers/loanController");

// Get all loans (Admin only)
router.get("/loans", protect, admin, getAllLoans );
router.patch("/loans/:id/approve", protect, admin, approveLoan );
router.patch("/loans/:id/reject", protect, admin, rejectLoan);
module.exports = router;
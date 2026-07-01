const Loan = require("../models/Loan");
const User = require("../models/User");


// Apply for loans
const applyForLoan = async ({ userId, amount, duration }) => {
  // Fixed interest rate (10%)
  const interestRate = 10;

  // Calculate interest amount
  const interestAmount = (amount * interestRate) / 100;

  // Calculate total repayment
  const totalRepayment = amount + interestAmount;

  // Calculate due date
  const dueDate = new Date();

  dueDate.setMonth(dueDate.getMonth() + duration);

  // Create loan
  const loan = await Loan.create({
    user: userId,
    amount,
    duration,
    interestRate,
    interestAmount,
    totalRepayment,
    dueDate,
  });

  return loan;
};

// Get loans
const getMyLoans = async (userId) => {
  const loans = await Loan.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });

  return loans;
};

// GET ALL LOANS (ADMIN)
const getAllLoans = async () => {
  const loans = await Loan.find()
    .populate("user", "name email phone")
    .sort({ createdAt: -1 });

  return loans;
};

// APPROVE LOAN
const approveLoan = async (loanId) => {
  const loan = await Loan.findById(loanId);

  if (!loan) {
    throw new Error("Loan not found");
  }

  if (loan.status !== "pending") {
    throw new Error("Loan has already been processed");
  }

  loan.status = "approved";

  loan.startDate = new Date();

  await loan.save();

  return loan;
};

// REJECT LOAN
const rejectLoan = async (loanId, reason) => {
  const loan = await Loan.findById(loanId);

  if (!loan) {
    throw new Error("Loan not found");
  }

  if (loan.status !== "pending") {
    throw new Error("Loan has already been processed");
  }

  loan.status = "rejected";
  loan.rejectionReason = reason;

  await loan.save();

  return loan;
};

// REPAY LOAN
const repayLoan = async (loanId, userId) => {
  const loan = await Loan.findById(loanId);

  if (!loan) {
    throw new Error("Loan not found");
  }

  if (loan.status !== "approved") {
    throw new Error("Only approved loans can be repaid.");
  }

  if (
    loan.user.toString() !== userId
) {
    throw new Error(
        "Unauthorized"
    );
}

  loan.status = "completed";

  loan.repaymentDate = new Date();

  await loan.save();

  const user = await User.findById(loan.user);

  user.trustScore += 10;

  await user.save();

  return loan;
};

module.exports = {
  applyForLoan,
  getMyLoans,
  getAllLoans,
  approveLoan,
  rejectLoan,
  repayLoan,
};

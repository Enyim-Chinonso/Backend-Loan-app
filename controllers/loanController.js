const loanService = require("../services/loanService");

// APPLY FOR LOAN
const applyForLoan = async (req, res) => {
  try {
    const { amount, duration } = req.body;

    if (!amount || !duration) {
      return res.status(400).json({
        message: "Amount and duration are required",
      });
    }

    const loan = await loanService.applyForLoan({
      userId: req.user._id,
      amount,
      duration,
    });

    res.status(201).json({
      message: "Loan application submitted successfully",
      loan,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MY LOANS
const getMyLoans = async (req, res) => {
  try {
    const loans = await loanService.getMyLoans(req.user._id);

    res.status(200).json({
      message: "Loans fetched successfully",
      count: loans.length,
      loans,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL LOANS (ADMIN)
const getAllLoans = async (req, res) => {
  try {

    const loans = await loanService.getAllLoans();

    res.status(200).json({
      message: "All loans fetched successfully",
      count: loans.length,
      loans,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// APPROVE LOAN

const approveLoan = async (req, res) => {
  try {

    const loan = await loanService.approveLoan(
      req.params.id
    );

    res.status(200).json({
      message: "Loan approved successfully",
      loan,
    });

  } catch (error) {

    res.status(400).json({
      message: error.message,
    });

  }
};



// REJECT LOAN
const rejectLoan = async (req, res) => {

  try {

    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        message: "Rejection reason is required",
      });
    }

    const loan =
      await loanService.rejectLoan(
        req.params.id,
        reason
      );

    res.status(200).json({
      message: "Loan rejected successfully",
      loan,
    });

  } catch (error) {

    res.status(400).json({
      message: error.message,
    });

  }
};


// REPAY LOAN
const repayLoan = async (req, res) => {

  try {

      const loan =
      await loanService.repayLoan(
        req.params.id, req.user._id
      );

    res.status(200).json({
      message: "Loan completed successfully",
      loan,
    });

  } catch (error) {

    res.status(400).json({
      message: error.message,
    });

  }

};

module.exports = {
  applyForLoan,
  getMyLoans,
  getAllLoans,
  approveLoan,
  rejectLoan,
  repayLoan
};
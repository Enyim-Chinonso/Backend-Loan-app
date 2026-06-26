const loanService = require("../services/loanService");

const applyForLoan = async (req, res) => {
  try {

    const {
      amount,
      duration,
    } = req.body;

    if (!amount || !duration) {
      return res.status(400).json({
        message: "Amount and duration are required",
      });
    }

    const loan =
      await loanService.applyForLoan({
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

module.exports = {
  applyForLoan,
};
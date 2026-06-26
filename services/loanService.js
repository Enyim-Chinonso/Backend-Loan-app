const Loan = require("../models/Loan");

const applyForLoan = async ({
  userId,
  amount,
  duration,
}) => {

  // Fixed interest rate (10%)
  const interestRate = 10;

  // Calculate interest amount
  const interestAmount =
    (amount * interestRate) / 100;

  // Calculate total repayment
  const totalRepayment =
    amount + interestAmount;

  // Calculate due date
  const dueDate = new Date();

  dueDate.setMonth(
    dueDate.getMonth() + duration
  );

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

module.exports = {
  applyForLoan,
};
const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    // The user who owns this loan
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Amount requested
    amount: {
      type: Number,
      required: true,
      min: 1000,
    },

    // Annual interest rate (%)
    interestRate: {
      type: Number,
      default: 10,
    },

    // Loan duration in months
    duration: {
      type: Number,
      required: true,
    },

    // Interest amount in naira
    interestAmount: {
      type: Number,
      default: 0,
    },

    // Total amount to repay
    totalRepayment: {
      type: Number,
      default: 0,
    },

    // Loan status
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "active",
        "completed",
      ],
      default: "pending",
    },

    // Date repayment begins
    startDate: {
      type: Date,
    },

    // Due date
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loan", loanSchema);
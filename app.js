const express = require("express");
const cors = require("cors");

const loanRoutes = require("./routes/loanRoutes");

const authRoutes = require("./routes/authRoutes")

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/loans", loanRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Loan Management System Running",
  });
});

module.exports = app;
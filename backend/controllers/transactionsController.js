const transactionsRouter = require("express").Router();
const Transaction = require("../models/transaction");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getToken = (req) => {
  const auth = req.get("Authorization");

  if (auth && auth.toLowerCase().startsWith("bearer")) {
    return auth.substring(7);
  }
  return null;
};

transactionsRouter.get("/", async (req, res) => {
  const transactions = await Transaction.find({});
  res.json(transactions);
});

transactionsRouter.delete("/:id", async (req, res) => {
  const token = getToken(req);

  const dekToken = jwt.verify(token, process.env.SECRET);

  if (!token || !dekToken.id) {
    return res.status(401).json({ error: "Token invalid or does not exist" });
  }

  const transaction = await Transaction.findById(req.params.id);

  if (transaction.user != dekToken.id) {
    return res.status(401).json({ error: "Not your transaction" });
  }

  await Transaction.findByIdAndRemove(req.params.id);

  const user = await User.findById(transaction.user);
  user.transactions = user.transactions.filter(
    (transaction) => transaction != req.params.id
  );

  await user.save();

  res.status(204).end();
});

transactionsRouter.post("/", async (req, res) => {
  const data = req.body;
  const token = getToken(req);

  const dekToken = jwt.verify(token, process.env.SECRET);

  if (!token || !dekToken.id) {
    return res.status(401).json({ error: "Token invalid or does not exist" });
  }
  const loggedUser = await User.findById(dekToken.id);

  const newTransaction = new Transaction({
    category: data.category,
    date: data.date,
    amount: data.amount,
    isIncome: data.isIncome,
    details: data.details,
    note: data.note,
    user: loggedUser._id,
  });

  const setTransaction = await newTransaction.save();
  loggedUser.transactions = loggedUser.transactions.concat(setTransaction._id);
  await loggedUser.save();

  res.json(setTransaction);
});

transactionsRouter.put("/:id", async (req, res) => {
  const token = getToken(req);

  const dekToken = jwt.verify(token, process.env.SECRET);

  if (!token || !dekToken.id) {
    return res.status(401).json({ error: "Token invalid or does not exist" });
  }

  const transaction = await Transaction.findById(req.params.id);

  if (transaction.user != dekToken.id) {
    return res.status(401).json({ error: "Not your transaction" });
  }

  const data = req.body;
  const id = req.params.id;

  const newNote = {
    note: data.note,
  };

  const newTransaction = await Transaction.findByIdAndUpdate(id, newNote, {
    new: true,
  });
  res.json(newTransaction);
});

module.exports = transactionsRouter;

const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("transactions");

  res.json(users);
});

usersRouter.get("/:username/transactions", async (req, res) => {
  const user = await User.find({ username: req.params.username }).populate(
    "transactions"
  );

  if (user.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

usersRouter.get("/:username/goals", async (req, res) => {
  const user = await User.find({ username: req.params.username }).populate(
    "goals"
  );

  if (user.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

usersRouter.post("/", async (req, res) => {
  const data = req.body;

  const userExists = await User.findOne({ username: data.username });

  if (userExists) {
    return res.status(400).json({
      error: "User already exists",
    });
  }

  const rounds = 10;
  const passHash = await bcrypt.hash(data.pass, rounds);

  const user = new User({
    username: data.username,
    name: data.name,
    passHash: passHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = usersRouter;

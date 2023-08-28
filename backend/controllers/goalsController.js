const goalsRouter = require("express").Router();
const Goal = require("../models/goal");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getToken = (req) => {
  const auth = req.get("Authorization");

  if (auth && auth.toLowerCase().startsWith("bearer")) {
    return auth.substring(7);
  }
  return null;
};

goalsRouter.get("/", async (req, res) => {
  const transactions = await Goal.find({});
  res.json(transactions);
});

goalsRouter.post("/", async (req, res) => {
  const data = req.body;
  const token = getToken(req);

  const dekToken = jwt.verify(token, process.env.SECRET);

  if (!token || !dekToken.id) {
    return res.status(401).json({ error: "Token invalid or does not exist" });
  }
  const loggedUser = await User.findById(dekToken.id);

  const newGoal = new Goal({
    dateSet: data.dateSet,
    goalAmount: data.goalAmount,
    currentGoalAmount: data.currentGoalAmount,
    title: data.title,
    user: loggedUser._id,
    isCompleted: data.isCompleted,
  });

  const setGoal = await newGoal.save();
  loggedUser.goals = loggedUser.goals.concat(setGoal._id);
  await loggedUser.save();

  res.json(setGoal);
});

goalsRouter.put("/:id", async (req, res) => {
  const token = getToken(req);

  const dekToken = jwt.verify(token, process.env.SECRET);

  if (!token || !dekToken.id) {
    return res.status(401).json({ error: "Token invalid or does not exist" });
  }

  const goal = await Goal.findById(req.params.id);

  if (goal.user != dekToken.id) {
    return res.status(401).json({ error: "Not your goal" });
  }
  const data = req.body;
  const id = req.params.id;

  const newCurrentGoalAmount = {
    currentGoalAmount: data.currentGoalAmount,
  };

  const newGoal = await Goal.findByIdAndUpdate(id, newCurrentGoalAmount, {
    new: true,
  });
  res.json(newGoal);
});

goalsRouter.put("/:id/complete", async (req, res) => {
  const token = getToken(req);

  const dekToken = jwt.verify(token, process.env.SECRET);

  if (!token || !dekToken.id) {
    return res.status(401).json({ error: "Token invalid or does not exist" });
  }

  const goal = await Goal.findById(req.params.id);

  if (goal.user != dekToken.id) {
    return res.status(401).json({ error: "Not your goal" });
  }
  const data = req.body;
  const id = req.params.id;

  const newCompletedGoal = {
    isCompleted: data.isCompleted,
    dateCompleted: data.dateCompleted,
  };

  const newGoal = await Goal.findByIdAndUpdate(id, newCompletedGoal, {
    new: true,
  });
  res.json(newGoal);
});

goalsRouter.delete("/:id", async (req, res) => {
  const token = getToken(req);

  const dekToken = jwt.verify(token, process.env.SECRET);

  if (!token || !dekToken.id) {
    return res.status(401).json({ error: "Token invalid or does not exist" });
  }

  const goal = await Goal.findById(req.params.id);

  if (goal.user != dekToken.id) {
    return res.status(401).json({ error: "Not your goal" });
  }

  await Goal.findByIdAndRemove(req.params.id);

  const user = await User.findById(goal.user);
  user.goals = user.goals.filter((goal) => goal != req.params.id);

  await user.save();

  res.status(204).end();
});

module.exports = goalsRouter;

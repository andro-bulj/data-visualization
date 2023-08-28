const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  dateSet: {
    type: String,
    required: true,
  },
  dateCompleted: {
    type: String,
    default: null,
  },
  goalAmount: {
    type: Number,
    required: true,
  },
  currentGoalAmount: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

goalSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Goal", goalSchema, "Goals");

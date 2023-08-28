const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isIncome: {
    type: Boolean,
    required: true,
  },
  note: {
    type: String,
    default: "Transaction",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

transactionSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model(
  "Transaction",
  transactionSchema,
  "Transactions"
);

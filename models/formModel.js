const mongoose = require("mongoose");
const formSchema = mongoose.Schema({
  department: {
    type: String,
    enum: ["admin", "b&a", "hr", "it-cell", "mto"],
    require: true,
  },
  category: {
    type: String,
    enum: ["software installation", "hardware", "dictionary"],
    require: true,
  },
  type: {
    type: String,
    enum: ["ms excel", "pencil", "book"],
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const formModel = mongoose.model("form", formSchema);

module.exports = formModel;

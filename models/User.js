const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String },
    gender: { type: String },
    state: { type: String },
    personality: { type: String },
    hobbies: { type: Array },
    password: { type: String },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("User", UserSchema);

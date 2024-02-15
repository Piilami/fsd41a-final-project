import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastname: { type: String },
  firstname: { type: String },
  birthday: { type: Date },
  country: { type: String },
  status: { type: String },
  friends: { type: Array },
  blocked: { type: Array },
});

const User = mongoose.model("User", userSchema);
export default User;

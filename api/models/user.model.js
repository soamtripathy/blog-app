import mongoose, { model, Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
});

export const User = mongoose.model("User", UserSchema);

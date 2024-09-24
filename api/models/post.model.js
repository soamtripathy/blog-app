import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    cover: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);

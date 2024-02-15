import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
});

const postSchema = mongoose.Schema({
  _id: { type: String },
  title: { type: String, required: true },
  content: { type: String },
  pictures: { type: Array },
  video: { type: Array },
  author: { type: Object, required: true },
  date: { type: Date, required: true },
  votes: {
    upvote: { type: Array, required: true },
    downvote: { type: Array, required: true },
  },
  responses: { type: [commentSchema], default: [] },
});

const Posts = mongoose.model("Posts", postSchema);
export default Posts;

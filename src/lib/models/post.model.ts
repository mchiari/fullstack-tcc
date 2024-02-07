import mongoose from "mongoose";
import { UserInterface } from "./user.model";
import { ClassInterface } from "./class.model";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // mentions: { type: mongoose.Schema.Types.ObjectId, refPath: "model_type" },
    // model_type: [{ type: String, ref: ["User", "Student", "Post"] }],
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  },
  {
    timestamps: true,
  }
);

export interface PostInterface {
  title: string;
  content: string;
  type: string;
  author: string | UserInterface
  mentions: string[] | ClassInterface[];
  _id?: string;
}

// export const getPosts = () => PostModel.find().populate('author mentions');
// export const getPost = (id: string) => PostModel.findOne({"_id": id}).populate('author mentions');

// export const createNewPost = (values: Record<string, any>) => new PostModel(values).save().then((post) => post.toObject());
// export const updatePost = (id: string, values: Record<string, any>) => PostModel.findByIdAndUpdate({"_id": id, values})

export const PostModel = mongoose.models.Post || mongoose.model<PostInterface, Document>("Post", PostSchema);

export type PostDocument = PostInterface & Document;

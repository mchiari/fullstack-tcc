"use server";

import mongoose from "mongoose";
import { PostModel } from "../models/post.model";
import { connectToDB } from "../mongoose";
import { newPostFormSchema } from "../schemas/post";

export const createPost = async (state: any, formData: FormData) => {
  connectToDB();

  // console.log(formData);

  const form = newPostFormSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    type: formData.get("type"),
    mentions: formData.getAll("mentions"),
    author: formData.get("author"),
  });

  if (form.success) {
    console.log(form.data);
    let { title, content, type, mentions, author } = form.data;
    console.log(mentions);
    //TODO: add more than one mention

    // const newPost = await new PostModel({
    //   title: title,
    //   content: content,
    //   type: type,
    //   mentions: mentions,
    //   author: author,
    // }).save();

    return { data: true };
  }

  if (form.error) {
    return { error: form.error.format() };
  }
};

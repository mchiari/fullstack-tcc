import React from "react";
import Post from "./Post";
import { PostInterface } from "@/lib/models/post.model";
import { ClassInterface } from "@/lib/models/class.model";
import { UserInterface } from "@/lib/models/user.model";

export type FeedProps = {
  posts: any;
};

export type Timestamp = {
  createdAt: string ;
  updatedAt: string ;
};

export const Feed: React.FC<FeedProps> = (data) => {
  console.log(data.posts);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-6">
      {data.posts.map((post: PostInterface & Timestamp, index: number) => {
            let mentions = post.mentions as ClassInterface[]
            let author = post.author as UserInterface

        return (
          <>
            <Post
              type={post.type}
              key={post._id}
              mentions={mentions}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              author={author}
            />
          </>
        );
      })}
    </div>
  );
};

export default Feed;

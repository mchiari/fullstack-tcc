import React from "react";
import NewPost from "./components/NewPost";
import { getClasses } from "@/lib/actions/class.actions";
import { getUserBySessionToken } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import { getPosts } from "@/lib/actions/post.actions";
import Feed from "./components/Feed";

const FeedPage = async () => {
  const classes = await getClasses();
  const token = cookies().get("sessionToken")?.value;
  const user = await getUserBySessionToken(token!);
  const posts = await getPosts()
  console.log(posts);

  return (
    user && (
      <div className="flex flex-col justify-center items-center w-full gap-6">
        <div className="flex justify-end items-center w-full">
          <NewPost classes={classes} user={user} />
        </div>
          <Feed posts={posts} />
      </div>
    )
  );
};

export default FeedPage;

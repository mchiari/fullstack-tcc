import React from "react";
import NewPost from "./components/NewPost";
import { getClasses } from "@/lib/actions/class.actions";
import { getUserBySessionToken } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";

const FeedPage = async () => {
  const classes = await getClasses();
  const token = cookies().get("sessionToken")?.value;
  const user = await getUserBySessionToken(token!);

  return (
    user && (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-end items-center w-full">
          <NewPost classes={classes} user={user} />
        </div>
      </div>
    )
  );
};

export default FeedPage;

"use client";

import { ClassInterface } from "@/lib/models/class.model";
import { UserInterface } from "@/lib/models/user.model";
import React from "react";

export type PostProps = {
  title: string;
  content: string;
  type: string;
  mentions: ClassInterface[];
  author: UserInterface;
  createdAt: string;
};

// const postMock = {
//   title: "Título de post para exemplo",
//   content:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo leo, aliquam ut fermentum id, eleifend a purus. Nunc purus lorem, pellentesque in lacus vitae, fringilla fermentum sem. Nullam commodo volutpat hendrerit. Maecenas a rhoncus lorem, non porttitor turpis. Cras ut lacus augue. Phasellus quis nunc velit. Integer dolor ante, tincidunt ut magna aliquet, ultrices aliquet sem. Sed eu congue erat. In hac habitasse platea dictumst. Pellentesque arcu libero, efficitur in lacinia ac, suscipit non tortor.",
//   type: "common",
//   mentions: ["Chico Bento", "Maria das Dores"],
//   author: "Professora Joana",
//   createdAt: {
//     $date: "2024-02-06T02:25:15.612Z",
//   },
// };

export const Post: React.FC<PostProps> = (data) => {
  const { title, content, type, mentions, author, createdAt } = data;

  let date = new Date(createdAt).toLocaleString("pt-br");

  //   console.log({});
  return type === "common" ? (
    <div className="flex flex-col justify-center items-center w-full rounded border border-black p-4 gap-2">
      <div className="flex flex-col justify-center items-start w-full">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="italic text-xs">
          {author.firstName} - {date}
        </span>
      </div>

      <div className="flex justify-center items-center w-full">
        <p className="text-sm indent-10">{content}</p>
      </div>

      <div className="flex justify-end items-center w-full gap-2">
        {Array.from(mentions).map((mention) => {
          return (
            <i key={mention._id}>
              <span className="text-xs">{mention.name}</span>
            </i>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default Post;

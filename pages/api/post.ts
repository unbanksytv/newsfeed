import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuht from "@/libs/serverAuth";

export default async function userPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST" && req.method !== "GET") {
      return res.status(400).end();
    }

    if (req.method === "POST") {
      //create post

      const { body, userId } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          userId,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      //get post
      const { userId } = req.query;
      let post;
      if (userId && typeof userId === "string") {
        console.log("userId", userId);
        post = await prisma.post.findMany({
          where: {
            userId: userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        post = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
      return res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

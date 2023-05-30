import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
export default async function follow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(400).end();
  }
  try {
    const { postId, currentUser } = req.body;
    console.log(postId, currentUser);

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      throw new Error("invalid id");
    }

    let updateLikes = [...(post.likesIds || [])];
    if (req.method === "POST") {
      updateLikes.push(currentUser);
    }

    if (req.method === "DELETE") {
      updateLikes = updateLikes.filter((x) => x !== currentUser);
    }

    const updatePostLikes = await prisma.post.update({
      where: { id: postId },
      data: {
        likesIds: updateLikes,
      },
    });

    return res.status(200).json(updatePostLikes);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

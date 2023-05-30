import serverAuht from "@/libs/serverAuth";
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
    const { userId, currentUser } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("invalid id");
    }

    let updateFollowing = [...(user.followingId || [])];
    if (req.method === "POST") {
      updateFollowing.push(userId);
    }

    if (req.method === "DELETE") {
      updateFollowing = updateFollowing.filter((x) => x !== userId);
    }

    const updateUser = await prisma.user.update({
      where: { id: currentUser },
      data: {
        followingId: updateFollowing,
      },
    });

    return res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

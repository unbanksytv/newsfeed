import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
export default async function getUserDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(400).end();
  }

  try {
    let { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingId: { has: userId },
      },
    });

    return res.status(200).json({ ...existingUser, followersCount });
  } catch (error) {
    return res.status(400).end();
  }
}

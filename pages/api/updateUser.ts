import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(400).end();
  }

  try {
    const { name, username, bio, profileImage, coverImage, id } = req.body;
    if (!name || !username) {
      throw new Error("Username and name is must");
    }
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        name,
        username,
        bio,
        profileImgage: profileImage,
        coverImage: coverImage,
      },
    });
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(400).end();
  }
}

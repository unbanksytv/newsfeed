import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
export default async function Register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(404).json("Invalid Url");

  try {
    const { email, name, username, password } = req.body;
    console.log("Into reg", name, email, password, username);

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

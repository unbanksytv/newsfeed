import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
export default async function current(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(400).end();
  }

  try {
    const currentUser = await serverAuth(req);
    return res.status(200).json(currentUser);
  } catch (error) {
    return res.status(400).end();
  }
}

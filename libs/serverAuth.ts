import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "./prismadb";

const serverAuht = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("Not Signed In");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }
  return currentUser;
};

export default serverAuht;

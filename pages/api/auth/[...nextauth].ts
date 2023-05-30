import bcrypt from "bcrypt";
import nextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/libs/prismadb";

export default nextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("INvalid Credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials");
        }

        const isCorrect = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrect) {
          throw new Error("Invalid Password");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

import NextAuth, { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/client";
import { Prisma } from "@prisma/client";

export const {handlers,signIn,signOut,auth} = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          scope: "openid profile email", 
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user, profile }) {
      try {
        const userExists = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!userExists) {
          let newUser: Prisma.UserCreateInput = {
            email: user?.email!,
            name: user.name!,
            accesstoken: account?.access_token!,
            avatar: profile?.picture,
            providerId: profile?.sub!,
            username: user.name!,
            isVerify: profile?.email_verified!,
          };
          await prisma.user.create({
            data: newUser,
          });
          console.log("user created succesfully");
        }

        console.log("user logged in");

        return true;
      } catch (error) {
        console.log("some error occured while signin", error);
        return false;
      }
    },
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isVerify = user.isVerify;
        token.username = user.username;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.isVerify = token.isVerify;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

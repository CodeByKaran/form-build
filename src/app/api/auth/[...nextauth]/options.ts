import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({account,user,profile}){
      try {
        //todo
        return true
      } catch (error) {
        console.log("server error occured",error);       
        return false
      }
    },
    async jwt({token,user}:{token:JWT;user:any}){
      if(user){
      token.id = user.id;
      token.email = user.email;
      token.isVerify = user.isVerify;
      token.username = user.username;
      token.avatar = user.avatar;
      }
      return token
    },
    async session({session,token}:{session:Session;token:JWT}){
      if (token.id) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.username = token.username
        session.user.isVerify = token.isVerify
        session.user.avatar = token.avatar
      }
      return session
    }
  },
  session:{
    strategy:"jwt"
  }
});

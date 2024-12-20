import {DefaultSession} from "next-auth"


declare module 'next-auth' {
    interface Session {
      user: {
        id: string;
        username?:string;
        isVerify?:boolean;
        avatar?: string;
        email?:string;    
      } & DefaultSession["user"];
    }
  }
declare module 'next-auth/jwt'{
    interface JWT{
        id?:string;
        username?:string;
        isVerify?:boolean;
        avatar?: string;
        email?:string ;
    }
}
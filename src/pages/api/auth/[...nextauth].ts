import { addUser } from '@/service/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      const { id, firstname, lastname, image, email } = user;
      // { user: { id, firstname, lastname, image, email } } 
      if (!email) {
        return false;
      }
      addUser({
        id,
        firstname: firstname || '',
        lastname: lastname || '',
        image,
        email,
        username: email.split('@')[0],
      });
      return true;
    },
    async session({ session, token }) {
      // console.log(session);
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
          id: token.id as string,
        };
      }
      return session;
    },
    async jwt({token, user}){
      if(user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
};
export default NextAuth(authOptions);

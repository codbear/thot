import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { ssrLogin } from '../../../modules/atoum-sdk';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      async authorize(credentials: Record<string, any>): Promise<any> {
        const { username, password } = credentials;

        const user = await ssrLogin({ username, password });

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (!user) {
        return token;
      }

      return { ...token, user };
    },
    async session(session, token) {
      return { ...session, user: token.user };
    },
  },
});

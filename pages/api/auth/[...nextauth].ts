import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      // eslint-disable-next-line consistent-return
      async authorize(credentials: Record<string, any>): Promise<any> {
        const { username, password } = credentials;
        const authUrl =
          process.env.NEXT_PUBLIC_API_ROOT_URL + process.env.NEXT_PUBLIC_API_AUTHORIZE_PATH;

        try {
          const auth = await axios.post(
            authUrl,
            { username, password },
            {
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
              },
            },
          );

          if (auth) {
            const decodedToken = jwtDecode(auth.data.token);

            return { status: 'success', data: decodedToken };
          }
        } catch (e) {
          const errorMessage = e.response.data.message;

          throw new Error(`${errorMessage}&email=${username}`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (!user) {
        return token;
      }

      return { ...token, user: user.data };
    },
    async session(session, token) {
      return { ...session, user: token.user };
    },
  },
  pages: {
    error: '/login',
  },
});

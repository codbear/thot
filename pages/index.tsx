import { getSession } from 'next-auth/client';
import { HomeScreen } from '../modules/home';

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: process.env.NEXT_PUBLIC_CLIENT_LOGIN_PATH,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default function Index({ session }) {
  const { user } = session;

  return <HomeScreen />;
}

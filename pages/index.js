import { getSession, signOut } from 'next-auth/client';

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
}

export default function Index({ session }) {
  const { user } = session;

  return (
    <>
      <p>Name: { user.name } </p>
      <p>Email: { user.email } </p>
      <p>id: { user.id } </p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}

import axios from 'axios';
import { API_ROUTES } from '../constants';

interface Credentials {
  username: string;
  password: string;
}

const ssrLogin = async (credentials: Credentials): Promise<any> => {
  const authUrl = API_ROUTES.ROOT_URL + API_ROUTES.AUTHORIZE_PATH;

  const authRequest = await axios.post(
    authUrl,
    { ...credentials },
    {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    },
  );

  const jwtToken = authRequest.data.token;

  const base64 = jwtToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const jwtPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join(''),
  );

  return JSON.parse(jwtPayload);
};

export default ssrLogin;

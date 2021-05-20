import { withLayout } from '../../layout';
import Login from './Login';
import Register from './Register';

export const LoginScreen = withLayout('anonymous')(Login);
export const RegisterScreen = withLayout('anonymous')(Register);

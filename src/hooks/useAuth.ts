import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../service/auth/auth';
import {
	loginFailed,
	loginSuccess,
	signUpFailed,
	signUpSuccess,
	startLogin,
	startSignUp,
	logOutSuccess,
} from '../redux/slice/AuthSlice';

const useAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logIn = async (data: any) => {
		dispatch(startLogin());
		try {
			const res = await authApi.Login(data);

			if (res.status === 200) {
				dispatch(loginSuccess(res.data));
				localStorage.setItem('token', JSON.stringify(res.data.token));
				navigate('/');
			} else if (res?.status === 400) {
				dispatch(loginFailed(res.data.error));
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const signUp = async (data: any) => {
		dispatch(startSignUp());
		try {
			const res = await authApi.Signup(data);
			console.log(res);
			if (res) {
				dispatch(signUpSuccess(res));
				navigate('/login');
			} else if (res.response.status === 400) {
				dispatch(signUpFailed(res.response.data.error));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const logOut = () => {
		localStorage.clear();
		dispatch(logOutSuccess());
		navigate('/login');
	};

	return { logIn, signUp, logOut };
};

export default useAuth;

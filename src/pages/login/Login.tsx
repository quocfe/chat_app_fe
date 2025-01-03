import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Inputs = {
	username: string;
	password: string;
};

const Login = () => {
	const { logIn } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await logIn(data);
	};

	const { error, loading } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		toast.error(error, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
			transition: Bounce,
		});
	}, [error]);

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<div className="flex items-center justify-center h-screen p-4 ">
				<div className="flex flex-col items-center justify-center mx-auto w-[550px] ">
					<div className="w-full p-6 rounded-lg shadow-md ">
						<h1 className="text-3xl font-semibold text-center text-gray-300">
							<span className="text-blue-500">Login</span>
						</h1>
						<div className="text-center mt-3">
							<p>Account demo</p>
							<p>username: user1 - user2 - user3</p>
							<p> password: 123123123</p>
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div>
								<label className="p-2 label">
									<span className="text-base label-text">Username</span>
								</label>
								<input
									type="text"
									placeholder="Username"
									className="w-full h-10 input input-bordered"
									{...register('username', {
										required: 'Username is required',
									})}
								/>
								{errors.username && (
									<span className="text-red-500">
										{errors.username.message}
									</span>
								)}
							</div>

							<div>
								<label className="label">
									<span className="text-base label-text">Password</span>
								</label>
								<input
									type="password"
									placeholder="Password"
									className="w-full h-10 input input-bordered"
									{...register('password', {
										required: 'Password is required',
										minLength: {
											value: 6,
											message: 'Password should be at least 6 characters',
										},
									})}
								/>
								{errors.password && (
									<span className="text-red-500">
										{errors.password.message}
									</span>
								)}
							</div>
							<Link
								to={'/signup'}
								className="inline-block mt-2 text-sm hover:underline hover:text-blue-600"
							>
								{"Don't"} have an account?
							</Link>
							{loading ? (
								<div>
									<p className="mt-2 btn btn-block btn-xl">Loading...</p>
								</div>
							) : (
								<div>
									<button className="mt-2 btn btn-block btn-xl">Login</button>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
export default Login;

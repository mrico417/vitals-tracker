import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { attemptGetLoginWithJWT } from "../api/auth";

export const Login = ({ setLogin }) => {
	const [loginCredentials, setLoginCredentials] = useState();
	const [loginErr, setLoginErr] = useState(null);
	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch(`/api/auth/login`, {
				method: "POST",
				body: JSON.stringify({
					login_name: loginCredentials.login_name,
					password: loginCredentials.password,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = await response.json();
			//console.log(result.token);
			if (response.ok) {
				window.localStorage.setItem("token", result.token);
				setLogin(await attemptGetLoginWithJWT());
				navigate("/");
			} else if (response.status === 401) {
				setLoginErr("Invalid login and password");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleLoginInputChange = (event) => {
		//console.log(event.target.name, event.target.value);

		setLoginCredentials({
			...loginCredentials,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div className="cls-login-container">
			<h1>Login</h1>
			<form
				onSubmit={handleLogin}
				onChange={handleLoginInputChange}
				id="login-form"
			>
				<input
					type="text"
					name="login_name"
					id="login_name"
					placeholder="login_name"
				/>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="password"
				/>
				<button type="submit">Login</button>
				{loginErr ? <div>{loginErr}</div> : ""}
			</form>
		</div>
	);
};

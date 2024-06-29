import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { attemptGetLoginWithJWT } from "../api/auth";

export const Register = ({ setLogin }) => {
	const [newRegistration, setNewRegistration] = useState();
	const navigate = useNavigate();

	const handleRegistration = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch(`/api/auth/register`, {
				method: "POST",
				body: JSON.stringify({
					login_name: newRegistration.login_name,
					email: newRegistration.email,
					password: newRegistration.password,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = await response.json();
			//console.log(result);
			window.localStorage.setItem("token", result.token);
			setLogin(await attemptGetLoginWithJWT());

			navigate("/");
		} catch (err) {
			//console.log(err);
		}
	};

	const handleChange = (event) => {
		//console.log(event.target.name, event.target.value);
		setNewRegistration({
			...newRegistration,
			[event.target.name]: event.target.value,
		});
		//console.log(newRegistration);
	};

	return (
		<div className="cls-register-container">
			<h1>Register</h1>
			<form
				onSubmit={handleRegistration}
				onChange={handleChange}
				id="register-form"
			>
				<input
					type="text"
					name="login_name"
					id="login_name"
					placeholder="login_name"
				/>
				<input type="text" name="email" id="email" placeholder="email" />
				<input
					type="password"
					name="password"
					id="password"
					placeholder="password"
				/>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

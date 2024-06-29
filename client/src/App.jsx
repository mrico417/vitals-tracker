import { useEffect, useState } from "react";
import "./App.css";
import { attemptGetLoginWithJWT } from "./api/auth";
import { Navigations } from "./components/Navigations";
import { Routes, Route } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Vitals } from "./components/Vitals";

function App() {
	const [login, setLogin] = useState(null);

	const getLogin = async () => {
		const loginResult = await attemptGetLoginWithJWT();
		console.log(loginResult);
		setLogin(loginResult);
	};

	useEffect(() => {
		getLogin();
	}, []);

	return (
		<>
			<div className="cls-main-container">
				<Navigations login={login} />
				<Routes>
					<Route path="/" element={<Vitals login={login} />} />
					<Route path="/register" element={<Register setLogin={setLogin} />} />
					<Route path="/login" element={<Login setLogin={setLogin} />} />
				</Routes>
			</div>
		</>
	);
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { attemptGetLoginWithJWT } from "./api/auth";
import { Navigations } from "./components/Navigations";
import { Routes, Route } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Vitals } from "./components/Vitals";
import { MyVitals } from "./components/MyVitals";

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
				<Navigations login={login} setLogin={setLogin} />
				<Routes>
					<Route path="/" element={<Vitals login={login} />} />
					<Route path="/vitals" element={<Vitals login={login} />} />
					<Route path="/register" element={<Register setLogin={setLogin} />} />
					<Route path="/login" element={<Login setLogin={setLogin} />} />
					<Route path="/myvitals" element={<MyVitals login={login} />} />
				</Routes>
			</div>
		</>
	);
}

export default App;

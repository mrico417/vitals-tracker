import { useState } from "react";
import "./App.css";
import { Navigations } from "./components/Navigations";
import { Routes, Route } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

function App() {
	const [token, setToken] = useState(null);

	return (
		<>
			<div className="cls-main-container">
				<Navigations token={token} />
				<Routes>
					{/* <Route path="/" element={<Vitals token={token} />} /> */}
					<Route path="/register" element={<Register setToken={setToken} />} />
					<Route path="/login" element={<Login setToken={setToken} />} />
				</Routes>
			</div>
		</>
	);
}

export default App;

import { Link, useNavigate } from "react-router-dom";

export const Navigations = ({ login, setLogin }) => {
	const navigate = useNavigate();

	const logoff = () => {
		window.localStorage.removeItem("token");
		setLogin(false);
		navigate("/login");
	};
	return (
		<div className="cls-navigations-container">
			<div className="nav-links">
				<Link to="/vitals">Vitals</Link>

				{login ? (
					<>
						<Link to="/myvitals">My Vitals</Link>
						<button onClick={logoff}>Logoff</button>
					</>
				) : (
					<>
						<Link to="/register">Register</Link>
						<Link to="/login">Login</Link>
					</>
				)}
			</div>
		</div>
	);
};

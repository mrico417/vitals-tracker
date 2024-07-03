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
					<h4>
						If you are not yet a member, ensure to register to access chart
						trends and other neat features
					</h4>
				</>
			)}
		</div>
	);
};

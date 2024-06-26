import { Link } from "react-router-dom";

export const Navigations = ({ token }) => {
	return (
		<div className="cls-navigations-container">
			{/* <Link to="/vitals">Vitals</Link> */}

			{token ? (
				<>
					{/* <Link to="/myvitals">My Vitals</Link> */}
					{/* <Link to="/account">Account</Link> */}
				</>
			) : (
				<>
					<Link to="/register">Register</Link>
					<Link to="/login">Login</Link>
				</>
			)}
		</div>
	);
};

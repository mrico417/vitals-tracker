/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MyVitalCard } from "./MyVitalCard";

export const MyVitals = ({ login }) => {
	const [myVitals, setMyVitals] = useState([]);

	// get vitals for login from api
	const getMyVitals = async () => {
		try {
			const response = await fetch(`/api/vitals/${login.id}/`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${window.localStorage.getItem("token")}`,
				},
			});

			const result = await response.json();

			console.log(result);
			setMyVitals(result.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getMyVitals();
	}, []);

	return (
		<>
			{login && myVitals.length > 0 ? (
				<div className="cls-myvitals-container">
					{myVitals.map((myVital) => (
						<MyVitalCard
							key={myVital.id}
							login={login}
							myVital={myVital}
							myVitals={myVitals}
							setMyVitals={setMyVitals}
						/>
					))}
				</div>
			) : !login ? (
				<h1>Need to login to see your vitals !</h1>
			) : (
				<h2>There are no vitals recorded. Start tracking it...</h2>
			)}
		</>
	);
};

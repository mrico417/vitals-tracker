export const MyVitalCard = ({ login, myVital, myVitals, setMyVitals }) => {
	const deleteVital = async (id) => {
		try {
			const response = await fetch(
				`/api/vitals/login/${login.id}/recordedvital/${myVital.id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${window.localStorage.getItem("token")}`,
					},
				}
			);

			await response.json();
			if (response.ok) {
				const updatedMyVitals = myVitals.filter((myVital) => myVital.id !== id);
				setMyVitals(updatedMyVitals);
			}
		} catch (error) {}
	};
	return (
		<div className="cls-myvital-card">
			<div>{myVital.created_cdt}</div>
			<div>{myVital.vital_name}</div>
			<div>{myVital.value}</div>
			<button onClick={() => deleteVital(myVital.id)}>Delete</button>
		</div>
	);
};

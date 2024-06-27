import { useEffect, useState } from "react";
import { VitalCard } from "./VitalCard";

export const Vitals = ({ token }) => {
	// useState to store vitals
	const [vitals, setVitals] = useState([]);
	const [selectedVitalID, setSelectedVitalID] = useState({});
	const [vitalInfo, setVitalInfo] = useState();

	// fetch the vitals from the api with useEffect
	const getVitals = async () => {
		try {
			const response = await fetch(`/api/vitals`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = await response.json();

			console.log(result.data);
			setVitals(result.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getVitals();
	}, []);

	const handleSave = async (event) => {
		event.preventDefault();
		console.log(token.id);

		try {
			const response = await fetch(`/api/vitals/${token.id}`, {
				method: "POST",
				body: JSON.stringify({
					vital_id: selectedVitalID,
					vital_value: vitalInfo.vital_value,
					created_datetime: vitalInfo.created_datetime,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const result = await response.json();
			//console.log(result.token);
			console.log(result);
		} catch (err) {
			//console.log(err);
		}
	};

	const handleRecordVitalInputChange = (event) => {
		//console.log(event.target.name, event.target.value);

		setVitalInfo({
			...vitalInfo,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<>
			<div className="cls-vitals-list">
				{vitals.map((vital) => {
					return (
						<VitalCard
							key={vital.id}
							vital={vital}
							setSelectedVitalID={setSelectedVitalID}
						/>
					);
				})}
			</div>
			<div className="cls-vitals-form">
				<form
					onSubmit={handleSave}
					onChange={handleRecordVitalInputChange}
					id="record-vital-form"
				>
					<input
						type="text"
						name="vital_value"
						id="vital_value"
						placeholder="vital_value"
					/>
					<input
						type="date"
						name="created_datetime"
						id="created_datetime"
						placeholder="created_datetime"
					/>
					<button type="submit">Save</button>
				</form>
			</div>
		</>
	);
};

import { useEffect, useState } from "react";
import { VitalCard } from "./VitalCard";

export const Vitals = ({ login }) => {
	// useState to store vitals
	const [vitals, setVitals] = useState([]);
	const [selectedVitalID, setSelectedVitalID] = useState({});
	const [vitalInfo, setVitalInfo] = useState();
	const [isSaved, setIsSaved] = useState(false);

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
		console.log(login.id);

		try {
			const response = await fetch(`/api/vitals/login/${login.id}`, {
				method: "POST",
				body: JSON.stringify({
					vital_id: selectedVitalID,
					vital_value: vitalInfo.vital_value,
					created_datetime: new Date(vitalInfo.created_datetime).toISOString(),
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${window.localStorage.getItem("token")}`,
				},
			});

			const result = await response.json();

			if (response.ok) {
				setIsSaved(true);
				event.target.reset();
			}
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
							setIsSaved={setIsSaved}
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
						onFocus={() => setIsSaved(false)}
					/>
					<input
						type="datetime-local"
						name="created_datetime"
						id="created_datetime"
						placeholder="created_datetime"
					/>
					<button type="submit">Save</button>
				</form>
				{isSaved ? <h5>Vital Recorded OK</h5> : ""}
			</div>
		</>
	);
};

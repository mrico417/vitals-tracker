export const VitalCard = ({ vital, setSelectedVitalID }) => {
	const updateVitalSelection = (vital_id) => {
		setSelectedVitalID(vital_id);
		console.log(vital_id);
	};

	return (
		<>
			<button
				onClick={() => updateVitalSelection(vital.id)}
				className="cls-vital-card"
				name={vital.vital_name}
				id={vital.id}
			>
				{vital.vital_name}
			</button>
		</>
	);
};

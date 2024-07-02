export const VitalCard = ({ vital, setSelectedVitalID, setIsSaved }) => {
	const updateVitalSelection = (vital_id) => {
		setIsSaved(false);
		setSelectedVitalID(vital_id);
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

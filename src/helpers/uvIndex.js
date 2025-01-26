export const uvIndex = index => {
	const uvValue = Number(index);

	if (!Number.isFinite(uvValue)) {
		return 'Invalid index';
	}

	if (uvValue >= 1 && uvValue <= 2) {
		return 'very low';
	}
	if (uvValue >= 3 && uvValue <= 5) {
		return 'moderate';
	}
	if (uvValue >= 6 && uvValue <= 7) {
		return 'high';
	}
	if (uvValue >= 8 && uvValue <= 10) {
		return 'very high';
	}
	if (uvValue >= 11) {
		return 'extreme';
	}

	// If uvValue is less than 1 or doesn't match any category
	return 'low';
};

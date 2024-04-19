export const pressureScale = pressure => {
	if (pressure >= 28.8 && pressure <= 29.39) {
		return 'very low';
	}
	if (pressure >= 29.4 && pressure <= 29.79) {
		return 'low';
	}
	if (pressure >= 29.8 && pressure <= 30.19) {
		return 'normal';
	}
	if (pressure >= 30.2 && pressure <= 30.49) {
		return 'high';
	}
	if (pressure >= 30.5 && pressure <= 31) {
		return 'very high';
	}
};

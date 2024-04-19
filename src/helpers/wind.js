export const windScale = windSpeed => {
	if (windSpeed < 1) {
		return 'Calm';
	}
	if (windSpeed >= 1 && windSpeed < 4) {
		return 'Light air';
	}
	if (windSpeed >= 4 && windSpeed < 8) {
		return 'Light breeze';
	}
	if (windSpeed >= 8 && windSpeed < 13) {
		return 'Gentle breeze';
	}
	if (windSpeed >= 13 && windSpeed < 19) {
		return 'Moderate breeze';
	}
	if (windSpeed >= 19 && windSpeed < 25) {
		return 'Fresh breeze';
	}
	if (windSpeed >= 25 && windSpeed < 32) {
		return 'Strong breeze';
	}
	if (windSpeed >= 32 && windSpeed < 39) {
		return 'High wind';
	}
	if (windSpeed >= 39 && windSpeed < 47) {
		return 'Fresh gale';
	}
	if (windSpeed >= 47 && windSpeed < 55) {
		return 'Strong gale';
	}
	if (windSpeed >= 55 && windSpeed < 63) {
		return 'Storm';
	}
	if (windSpeed >= 63 && windSpeed < 72) {
		return 'Violent storm';
	}
	if (windSpeed >= 72) {
		return 'Hurricane-force';
	}
};

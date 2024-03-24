export const getLocation = callback => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error);
	} else {
		console.error('Geolocation is not supported by this browser.');
	}

	function success(position) {
		const locationObj = {
			lat: position.coords.latitude,
			long: position.coords.longitude,
		};
		console.log(locationObj);
		console.log(position);
		callback(locationObj);
	}

	function error(err) {
		if (err.code === 1) {
			console.error(
				'User denied location access. Please allow location for the app to work correctly.',
			);
		} else {
			console.error(`Geolocation error (${err.code}): ${err.message}`);
		}
	}
};

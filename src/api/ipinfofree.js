//http://ip-api.com/json/24.11.78.72

import axios from 'axios';

export const fetchIpGeolocationFree = async ip => {
	try {
		const response = await axios.get(`http://ip-api.com/json/${ip}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching IP geolocation:', error);
	}
};

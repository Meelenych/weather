import axios from 'axios';

export const fetchGeopify = async () => {
	try {
		const response = await axios.get(
			'https://api.geoapify.com/v1/ipinfo?&apiKey=2aaae5a2353e427b8f879876df0e4831',
		);
		// console.log(response);
		return response.data;
	} catch (error) {
		console.error('Error fetching IP geolocation:', error);
	}
};

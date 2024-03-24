import axios from 'axios';

export const fetchIpGeolocation = async () => {
	try {
		const response = await axios.get(
			'https://ipgeolocation.abstractapi.com/v1/?api_key=1d61b36ac3594fef949a97645df19ea5&ip_address=2601:680:cd01:5fe0:70d8:230b:1e4:42b2',
		);
		// console.log(response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching IP geolocation:', error);
	}
};

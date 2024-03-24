export async function getMyIP() {
	try {
		// Make a GET request to ipify.org API
		const response = await fetch('https://api.ipify.org?format=json');
		// Parse the JSON response
		const data = await response.json();
		// Extract and return the IP address
		return data.ip;
	} catch (error) {
		console.error('Error fetching IP address:', error);
		return null;
	}
}

// Usage
getMyIP().then(ip => {
	console.log('My IP address is:', ip);
});

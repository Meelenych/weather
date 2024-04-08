export default function formatTime(timezone) {
	const now = new Date();
	const options = { timeZone: timezone, hour12: false };

	const formatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		...options,
	});

	return formatter.format(now);
}

import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Clock({ timezone }) {
	const [currentTime, setCurrentTime] = useState(formatCurrentTimeInTimeZone());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(formatCurrentTimeInTimeZone());
		}, 1000);
		return () => clearInterval(intervalId);
	}, [timezone]);

	function formatCurrentTimeInTimeZone() {
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

	return (
		<>
			<span>
				{'\u00A0'} {currentTime}
			</span>
		</>
	);
}

export default Clock;

Clock.propTypes = {
	timezone: PropTypes.string,
};

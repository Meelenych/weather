import React from 'react';
import PropTypes from 'prop-types';

export default function WeatherPanel({ cityWeather }) {
	return (
		<div className='p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4'>
			<p className='text-xl font-medium text-black'>
				Country: {cityWeather?.location.country}
			</p>
			<p>City: {cityWeather?.location.name}</p>
			<p>
				Feels like: {cityWeather?.current.feelslike_c} <span>&#176;</span>C
			</p>
			<p>
				Temperature: {cityWeather?.current.temp_c} <span>&#176;</span>C
			</p>
			<img src={`http://${cityWeather?.current.condition.icon.slice(2)}`} />
		</div>
	);
}

WeatherPanel.propTypes = {
	children: PropTypes.any,
	cityWeather: PropTypes.object,
};

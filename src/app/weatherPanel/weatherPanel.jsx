import React from 'react';
import PropTypes from 'prop-types';

export default function WeatherPanel({ cityWeather }) {
	return (
		<div className='bg-indigo-100 rounded-md shadow-xl p-3 w-1/4 mt-4'>
			<p className='text-xl font-medium text-indigo-700 '>
				Country: {cityWeather?.location.country}
			</p>
			<p className='text-indigo-400 font-medium'>
				City: {cityWeather?.location.name}
			</p>
			<p>
				Feels like: {cityWeather?.current.feelslike_c} <span>&#176;</span>C
			</p>
			<p>
				Temperature: {cityWeather?.current.temp_c} <span>&#176;</span>C
			</p>
			<img
				src={
					cityWeather ? `http://${cityWeather?.current.condition.icon.slice(2)}` : ''
				}
			/>
		</div>
	);
}

WeatherPanel.propTypes = {
	children: PropTypes.any,
	cityWeather: PropTypes.object,
};

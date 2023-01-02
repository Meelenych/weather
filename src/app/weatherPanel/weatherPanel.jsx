import React from 'react';
import PropTypes from 'prop-types';

export default function WeatherPanel({ cityWeather, unpin, unpinBtn }) {
	return (
		<li className='w-1/4 mt-4 w-full'>
			<div
				className={
					cityWeather?.current.is_day === 0
						? 'bg-blue-900 p-3 rounded-md shadow-xl'
						: 'bg-blue-400 p-3 rounded-md shadow-xl'
				}>
				<p className='text-xl font-medium text-indigo-700 '>
					Country: {cityWeather?.location.country}
				</p>
				<p className='text-indigo-700 font-medium'>
					Region: {cityWeather?.location.region}
				</p>
				<p className='text-indigo-700 font-medium'>
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
						cityWeather
							? `http://${cityWeather?.current.condition.icon.slice(2)}`
							: ''
					}
				/>
				<p>Local time: {cityWeather?.location.localtime.slice(10)}</p>

				{unpinBtn !== false && (
					<button
						type='button'
						onClick={unpin}
						className='border-solid border-2 border-indigo-600 p-1 rounded-md text-lg font-semiboldfont-semibold bg-indigo-600 text-white'>
						Unpin
					</button>
				)}
			</div>
		</li>
	);
}

WeatherPanel.propTypes = {
	children: PropTypes.any,
	cityWeather: PropTypes.object,
	unpin: PropTypes.func,
	unpinBtn: PropTypes.bool,
};

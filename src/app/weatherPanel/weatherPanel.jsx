import React from 'react';
import PropTypes from 'prop-types';
import Clock from '../../clock/clock';
import closeIcon from '../../images/close.svg';

export default function WeatherPanel({ cityWeather, unpin, unpinBtn }) {
	return (
		<li className='w-1/4 w-full'>
			<div
				className={`relative ${
					cityWeather?.current.is_day === 0
						? 'bg-blue-900 p-3 shadow-xl'
						: 'bg-blue-400 p-3 shadow-xl'
				}`}>
				<p className='text-amber-500 font-medium text-xl'>
					City: {cityWeather?.location.name}
				</p>
				<p className='text-amber-500 font-medium'>
					Region: {cityWeather?.location.region}
				</p>
				<p className=' font-medium text-amber-500 '>
					Country: {cityWeather?.location.country}
				</p>
				<p className='text-amber-100'>
					Feels like: {cityWeather?.current.feelslike_c} <span>&#176;</span>C or{' '}
					{cityWeather?.current.temp_f} F
				</p>
				<p className='text-amber-100'>
					Temperature: {cityWeather?.current.temp_c} <span>&#176;</span>C or{' '}
					{cityWeather?.current.temp_f} F
				</p>
				<img
					src={
						cityWeather
							? `http://${cityWeather?.current.condition.icon.slice(2)}`
							: ''
					}
				/>
				<p className='flex text-amber-100'>
					Local time: <Clock timezone={cityWeather?.location.tz_id} />
				</p>

				{unpinBtn !== false && (
					<button
						type='button'
						onClick={unpin}
						className='absolute top-2 right-2 active:scale-90 rounded-md text-lg font-semibold bg-amber-500 text-blue-900'>
						<img
							src={closeIcon}
							width={30}
							alt=''
						/>
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
	timezone: PropTypes.string,
};

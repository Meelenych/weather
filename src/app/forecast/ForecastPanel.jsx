import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HourForecastPanel from '../hour/HourForecastPanel';
import { uvIndex } from '../../helpers/uvIndex';

export default function ForecastPanel({ day, hour, isDay, city }) {
	const [showHourly, setShowHourly] = useState(false);
	const toggleHourly = () => {
		setShowHourly(!showHourly);
	};
	return (
		<div
			className={`p-3 ${isDay !== 0 ? 'bg-blue-400' : 'bg-blue-900'} text-amber-100
`}>
			<h3 className='text-xl mb-2 text-amber-500 font-medium grid grid-cols-5 gap-2'>
				<span className='truncate col-span-3'>{city}</span>
				<span className='col-span-2 text-right'>
					{day?.date
						? new Intl.DateTimeFormat('en-US', {
								month: 'short',
								day: 'numeric',
						  }).format(new Date(day.date))
						: ''}
				</span>
			</h3>
			<p>
				<img
					src={day ? `http://${day?.day?.condition?.icon.slice(2)}` : 'Loading...'}
				/>
			</p>
			<p className='text-amber-300'>{day?.day.condition?.text}</p>
			<p className='text-amber-300'>
				Temperature: {day?.day.avgtemp_c} <span>&#176;</span>C or{' '}
				{day?.day.avgtemp_f}
				<span>&#176;</span>F
			</p>
			<p>
				Max temperature: {day?.day.maxtemp_c}
				<span>&#176;</span>C or {day?.day.maxtemp_f}
				<span>&#176;</span>F
			</p>
			<p>
				Min temperature: {day?.day.mintemp_c}
				<span>&#176;</span>C or {day?.day?.mintemp_f}
				<span>&#176;</span>F
			</p>
			<p>Humidity: {day?.day.avghumidity} %</p>
			<p>
				Visibility: {day?.day.avgvis_km} km or {day?.day.avgvis_miles} mi
			</p>
			<p>
				Wind Speed: {day?.day.maxwind_kph} kmph or {day?.day.maxwind_mph} mph
			</p>
			<p>UV Index: {uvIndex(day?.day.uv)}</p>
			{day?.day.daily_chance_of_rain !== 0 && (
				<p>Chance of rain: {day?.day.daily_chance_of_rain} %</p>
			)}
			{day?.day.daily_chance_of_snow !== 0 && (
				<p>Chance of snow: {day?.day.daily_chance_of_snow} %</p>
			)}
			<p>Will it rain: {day?.day.daily_will_it_rain ? 'yes' : 'no'}</p>
			{day?.day.daily_chance_of_snow !== 0 && (
				<p>Will it snow: {day?.day.daily_will_it_snow ? 'yes' : 'no'}</p>
			)}
			{day?.day.totalprecip_mm !== 0 && (
				<p>
					Precipitation: {day?.day.totalprecip_mm} mm or {day?.day.totalprecip_in} in
				</p>
			)}
			{day?.day.totalsnow_cm !== 0 && <p>Snowfall: {day?.day.totalsnow_cm} cm</p>}
			<p>Sunrise: {day?.astro.sunrise}</p>
			<p>Sunset: {day?.astro.sunset}</p>
			<p className='text-neutral-400'>Moonrise: {day?.astro.moonrise}</p>
			<p className='text-neutral-400'>Moonset: {day?.astro.moonset}</p>
			<p className='text-neutral-400'>
				Moon illumination: {day?.astro.moon_illumination}
			</p>
			<p className='text-neutral-400'>Moon phase : {day?.astro.moon_phase}</p>

			<button
				className={`mt-2 border w-full text-blue-800 font-medium text-xl rounded-md bg-amber-300 p-1 hover:border-orange-500 active:bg-orange-500 active:border-orange-500`}
				onClick={() => toggleHourly()}>
				{showHourly ? 'Hide hourly forecast' : 'Show hourly forecast'}
			</button>
			{showHourly && (
				<HourForecastPanel
					hour={hour}
					toggleHourly={toggleHourly}
				/>
			)}
		</div>
	);
}

ForecastPanel.propTypes = {
	day: PropTypes.object,
	hour: PropTypes.array,
	isDay: PropTypes.number,
	city: PropTypes.string,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HourForecastPanel from '../hour/hourForecastPanel';

export default function ForecastPanel({ day, isDay, city }) {
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
			<p>Humidity: {day?.day.avghumidity}</p>
			<p>
				Temperature: {day?.day.avgtemp_c} <span>&#176;</span>C or{' '}
				{day?.day.avgtemp_f}
				<span>&#176;</span>F
			</p>
			<p>
				Visibility: {day?.day.avgvis_km} km or {day?.day.avgvis_miles}
			</p>
			<p>
				<img
					src={day ? `http://${day?.day.condition?.icon.slice(2)}` : 'Loading...'}
				/>
			</p>
			<p>Conditions: {day?.day.condition?.text}</p>
			<p>
				Wind Speed: {day?.day.maxwind_kph} kmph or {day?.day.maxwind_mph} mph
			</p>
			<p>UV Index: {day?.day.uv}</p>
			<p>Chance of rain: {day?.day.daily_chance_of_rain}</p>
			<p>Chance of snow: {day?.day.daily_chance_of_snow}</p>
			<p>Will it rain: {day?.day.daily_will_it_rain}</p>
			<p>Will it snow: {day?.day.daily_will_it_snow}</p>
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
			<p>
				Precipitation: {day?.day.totalprecip_mm} mm or {day?.day.totalprecip_in} in
			</p>
			<p>Snowfall: {day?.day.totalsnow_cm} cm</p>
			<p>Is sun visible: {day?.astro.is_sun_up ? 'yes' : 'no'}</p>
			<p>Sunrise: {day?.astro.sunrise}</p>
			<p>Sunset: {day?.astro.sunset}</p>
			<p>Is moon visible: {day?.astro.is_moon_up ? 'yes' : 'no'}</p>
			<p>Moonrise: {day?.astro.moonrise}</p>
			<p>Moonset: {day?.astro.moonset}</p>
			<p>Moon illumination: {day?.astro.moon_illumination}</p>
			<p>Moon phase : {day?.astro.moon_phase}</p>

			<p>
				Weather alerts:{' '}
				{day?.alerts?.length > 0
					? day?.alerts.map(alert => alert.message).join(', ')
					: 'No weather alerts'}
			</p>
      <button
							className={`mt-2 border w-full text-blue-800 font-medium text-xl rounded-md bg-amber-300 p-1 hover:border-orange-500 active:bg-orange-500 active:border-orange-500`}
							onClick={() => toggleHourly()}>
							{showHourly ? 'Hide hourly forecast' : 'Show hourly forecast'}
						</button>
			{showHourly && <HourForecastPanel />}
		</div>
	);
}

ForecastPanel.propTypes = {
	day: PropTypes.object,
	// unpin: PropTypes.func,
	isDay: PropTypes.number,
	city: PropTypes.string,
	// lastUpdate: PropTypes.string,
	// update: PropTypes.func,
};

import React from 'react';
import PropTypes from 'prop-types';

export default function ForecastPanel({ day, isDay, city }) {
	return (
		<div
			className={`p-3 ${isDay ? 'bg-blue-400' : 'bg-blue-900'} text-amber-100
`}>
			<h3 className='text-xl mb-2 text-amber-500 font-medium grid grid-cols-5 gap-2'>
				<span className='truncate col-span-3'>{city}</span>{' '}
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
				Temperature: {day?.day.avgtemp_c} *C or {day?.day.avgtemp_f}*F
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
				Max temperature: {day?.day.maxtemp_c}*C or {day?.day.maxtemp_f}*F
			</p>
			<p>
				Min temperature: {day?.day.mintemp_c}*C or {day?.day?.mintemp_f}*F
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
		</div>
	);
}

ForecastPanel.propTypes = {
	day: PropTypes.object,
	// unpin: PropTypes.func,
	isDay: PropTypes.bool,
	city: PropTypes.string,
	// lastUpdate: PropTypes.string,
	// update: PropTypes.func,
};

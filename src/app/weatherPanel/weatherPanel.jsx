import React from 'react';
import PropTypes from 'prop-types';
import ForecastPanel from '../forecast/forecast';
import Clock from '../../clock/clock';
import { windScale } from '../../helpers/wind';
import { pressureScale } from '../../helpers/pressure';
import closeIcon from '../../images/close.svg';

export default function WeatherPanel({
	cityWeather,
	unpin,
	unpinBtn,
	lastUpdate,
	update,
	forecast,
}) {
	const [showMore, setShowMore] = React.useState(false);
	const handleClickShowMore = () => {
		setShowMore(!showMore);
	};
	const [showForecast, setShowForecast] = React.useState(false);
	const toggleForecast = () => {
		setShowForecast(!showForecast);
	};

	return (
		<li className='w-full'>
			<div
				className={
					unpinBtn !== false
						? `relative ${
								cityWeather?.current.is_day === 0
									? 'bg-blue-900 p-3'
									: 'bg-blue-400 p-3'
						  }`
						: 'relative bg-transparent'
				}>
				<p className='text-amber-500 font-medium text-xl'>
					City: {cityWeather?.location.name}
				</p>
				<p className='text-amber-500 font-medium'>
					Region: {cityWeather?.location.region}
				</p>
				<p className=' font-medium text-amber-500 '>
					Country: {cityWeather?.location.country}
				</p>
				<img
					src={
						cityWeather
							? `http://${cityWeather?.current.condition.icon.slice(2)}`
							: ''
					}
				/>
				<p className='text-amber-100'>{cityWeather?.current.condition.text}</p>
				<p className='text-amber-100'>
					Feels like: {cityWeather?.current.feelslike_c} <span>&#176;</span>C or{' '}
					{cityWeather?.current.feelslike_f} F
				</p>
				{showMore && (
					<div
						className={`overflow-hidden transition-height duration-300 ${
							showMore ? 'h-auto' : 'h-0'
						}`}>
						<p className='text-amber-100'>
							Temperature: {cityWeather?.current.temp_c} <span>&#176;</span>C or{' '}
							{cityWeather?.current.temp_f} F
						</p>
						<p className='text-amber-100'>
							Pressure: {pressureScale(cityWeather?.current.pressure_in)}
						</p>
						<p className='text-amber-100'>
							Wind: direction {cityWeather?.current.wind_dir},{' '}
							{windScale(cityWeather?.current.wind_mph).toLowerCase()}
						</p>
						<p className='text-amber-100'>
							Humidity: {cityWeather?.current.humidity} %
						</p>
						<p className='text-amber-100'>
							Visibility: {cityWeather?.current.vis_km} km or{' '}
							{cityWeather?.current.vis_miles} mi
						</p>
						<p className='flex text-amber-100'>
							Local time: <Clock timezone={cityWeather?.location.tz_id} />
						</p>
						{unpinBtn !== false && (
							<p className='text-amber-100 mb-1'>Last update: {lastUpdate}</p>
						)}
					</div>
				)}
				<div
					className={`grid  gap-2 mt-2 ${
						unpinBtn !== false ? 'grid-cols-2' : 'grid-cols-1'
					}`}>
					{unpinBtn !== false && (
						<button
							className=' border w-full text-blue-800 font-medium text-xl rounded-md bg-amber-300 p-1  hover:border-orange-500 active:bg-orange-500 active:border-orange-500'
							onClick={() => update()}>
							Update
						</button>
					)}
					<button
						className={`border w-full text-blue-800 font-medium text-xl rounded-md bg-amber-300 p-1 hover:border-orange-500 active:bg-orange-500 active:border-orange-500 ${
							unpinBtn !== false ? 'p-0' : 'p-2'
						}`}
						onClick={() => handleClickShowMore()}>
						{showMore ? 'Hide details' : 'Show details'}
					</button>
				</div>
				{unpinBtn !== false && (
					<div className='mt-3'>
						<button
							className={`border w-full text-blue-800 font-medium text-xl rounded-md bg-amber-300 p-1 hover:border-orange-500 active:bg-orange-500 active:border-orange-500 ${
								unpinBtn !== false ? 'p-0' : 'p-2'
							}`}
							onClick={() => toggleForecast()}>
							{showForecast ? 'Hide daily forecast' : 'Show daily forecast'}
						</button>
					</div>
				)}
				{unpinBtn !== false && (
					<button
						type='button'
						onClick={unpin}
						className='border absolute top-2 right-2 active:scale-90 rounded-md text-lg font-semibold bg-amber-500 text-blue-900 shadow-amber-500 hover:border-orange-500 active:bg-orange-500 active:border-orange-500'>
						<img
							src={closeIcon}
							width={30}
							alt=''
						/>
					</button>
				)}
			</div>
			{showForecast && forecast?.length > 0 && (
				<div className='mt-4 absolute top0 md:top-1/2 left-1/2 transform -translate-x-1/2 translate-y-0 md:-translate-y-1/2 w-[360px] md:w-[1024px] z-50 bg-black/75 p-5 shadow-[0_0_30px_8px] shadow-amber-100'>
					<h2 className='text-left text-xl font-bold text-amber-300 flex mb-3 justify-between'>
						<span>Daily Forecast</span>
						<button
							className={`active:scale-90 rounded-md bg-amber-500 p-0.5 ${
								unpinBtn !== false ? 'p-0' : 'p-2'
							}`}
							onClick={() => toggleForecast()}>
							<img
								src={closeIcon}
								width={30}
								alt=''
							/>
						</button>
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
						{forecast.map(day => (
							<div key={day.date_epoch}>
								<ForecastPanel
									day={day}
									isDay={cityWeather?.cityInfo?.current.is_day}
									city={cityWeather?.location.name}
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</li>
	);
}

WeatherPanel.propTypes = {
	cityWeather: PropTypes.object,
	unpin: PropTypes.func,
	unpinBtn: PropTypes.bool,
	timezone: PropTypes.string,
	lastUpdate: PropTypes.string,
	update: PropTypes.func,
	forecast: PropTypes.array,
};

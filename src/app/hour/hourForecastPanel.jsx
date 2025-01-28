import React from 'react';
import ChartTable from '../components/ChartTable';
import PropTypes from 'prop-types';
import closeIcon from '../../images/close.svg';

export default function HourForecastPanel({ hour, toggleHourly }) {
	// Transform the data to match ChartTable's requirements
	const chartData = hour?.map(hr => ({
		time: hr.time?.slice(10) || '', // Extract hour from time (fallback to empty string)
		feelslikeC: hr.feelslike_c || 0,
		feelslikeF: hr.feelslike_f || 0,
	}));

	return (
		<div className='mt-4 absolute top0 md:top-1/2 left-1/2 transform -translate-x-1/2 translate-y-0 md:-translate-y-1/2 w-[360px] md:w-[1024px] z-50 bg-black/75 p-5 shadow-[0_0_30px_8px] shadow-amber-100'>
			<h2 className='text-left text-xl font-bold text-amber-300 flex mb-3 justify-between'>
				Hourly Forecast Panel{' '}
				<button
					className={`border active:scale-90 rounded-md bg-amber-500`}
					onClick={() => toggleHourly()}>
					<img
						src={closeIcon}
						width={30}
						alt=''
					/>
				</button>
			</h2>
			{/* Pass transformed data to ChartTable */}
			{chartData?.length > 0 ? (
				<ChartTable data={chartData} />
			) : (
				<p>No hourly data available</p>
			)}
		</div>
	);
}

HourForecastPanel.propTypes = {
	hour: PropTypes.arrayOf(
		PropTypes.shape({
			time: PropTypes.string,
			time_epoch: PropTypes.number,
			feelslike_c: PropTypes.number,
			feelslike_f: PropTypes.number,
		}),
	),
};

HourForecastPanel.propTypes = {
	hour: PropTypes.array,
	toggleHourly: PropTypes.func,
};

import React from 'react';
import PropTypes from 'prop-types';

export default function HourForecastPanel({ hour }) {
	return (
		<div>
			Hourly Forecast Panel
			{hour?.map(hr => (
				<div key={hr.time_epoch}>
					<p>
						At {hr.time.slice(10)} it will feel like {hr.feelslike_c}
						<span>&#176;</span>C or {hr.feelslike_f}
						<span>&#176;</span>F
					</p>
				</div>
			))}
		</div>
	);
}

HourForecastPanel.propTypes = {
	hour: PropTypes.object,
};

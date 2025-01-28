import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import {
	Chart,
	ArgumentAxis,
	ValueAxis,
	AreaSeries,
	Title,
	Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import { curveCatmullRom, area } from 'd3-shape';
import { scalePoint } from 'd3-scale';

export default function ChartTable({ data }) {
	const PREFIX = 'Demo';

	const classes = {
		chart: `${PREFIX}-chart`,
	};
	const Root = props => (
		<Legend.Root
			{...props}
			sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }}
		/>
	);
	const Label = props => (
		<Legend.Label
			{...props}
			sx={{ whiteSpace: 'nowrap' }}
		/>
	);
	const StyledChart = styled(Chart)(() => ({
		[`&.${classes.chart}`]: {
			paddingRight: '20px',
		},
	}));

	const Area = props => (
		<AreaSeries.Path
			{...props}
			path={area()
				.x(({ arg }) => arg)
				.y1(({ val }) => val)
				.y0(({ startVal }) => startVal)
				.curve(curveCatmullRom)}
		/>
	);

	return (
		<Paper>
			<StyledChart
				data={data}
				className={classes.chart}>
				<ArgumentScale factory={scalePoint} />
				<ArgumentAxis />
				<ValueAxis />

				<AreaSeries
					name='Feels Like (C)'
					valueField='feelslikeC'
					argumentField='time'
					seriesComponent={Area}
				/>
				<AreaSeries
					name='Feels Like (F)'
					valueField='feelslikeF'
					argumentField='time'
					seriesComponent={Area}
				/>
				<Animation />
				<Legend
					position='bottom'
					rootComponent={Root}
					labelComponent={Label}
				/>
				<Title text='Hourly Temperature Chart' />
			</StyledChart>
		</Paper>
	);
}

ChartTable.propTypes = {
	data: PropTypes.array.isRequired,
};

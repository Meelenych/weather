import { useState, useEffect } from 'react';
import React from 'react';
import { url } from '../api/api';
import WeatherPanel from './weatherPanel/weatherPanel';
import axios from 'axios';

export default function Application() {
	const [cityWeather, setCityWeather] = useState();
	const [submitValue, setSubmitValue] = useState('Vienna');
	const [changeValue, setChangeValue] = useState('');

	const onFormSubmit = data => {
		setSubmitValue(data);
	};

	const handleChange = e => {
		setChangeValue(e.currentTarget.value);
	};

	const clearForm = () => {
		setChangeValue('');
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (changeValue.trim() === '') {
			clearForm();
			return;
		}

		onFormSubmit(changeValue.toLowerCase().trim());
		clearForm();
	};

	const current = async () => {
		try {
			const res = await axios.get(url + submitValue);
			console.log(res.data);
			return res.data;
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		current().then(data => {
			console.log(data);
			setCityWeather(data);
		});
	}, [submitValue]);

	return (
		<div className='container mx-auto p-4'>
			<form onSubmit={handleSubmit}>
				<button
					type='submit'
					className='mr-4 border-solid border-2 border-indigo-600 p-2 rounded-md text-indigo-800 text-xl font-semiboldfont-semibold bg-indigo-600 text-white'>
					<span>Search</span>
				</button>

				<input
					type='text'
					autoComplete='off'
					placeholder='Search a city'
					onChange={handleChange}
					value={changeValue}
					className='border-solid border-2 border-indigo-600 p-2 rounded-md text-indigo-800 text-xl font-semiboldfont-semibold'
				/>
			</form>
			{submitValue && (
				<>
					{/* <div className='columns-4 py-6'> */}
					<WeatherPanel cityWeather={cityWeather} />
					{/* <WeatherPanel cityWeather={cityWeather} />
						<WeatherPanel cityWeather={cityWeather} />
						<WeatherPanel cityWeather={cityWeather} />
					</div> */}
				</>
			)}
		</div>
	);
}

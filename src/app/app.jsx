import { useState, useEffect } from 'react';
import React from 'react';
import { url } from '../api/api';
import WeatherPanel from './weatherPanel/weatherPanel';
import axios from 'axios';
import { uid } from 'uid';

export default function Application() {
	const [cityWeather, setCityWeather] = useState(null);
	const [submitValue, setSubmitValue] = useState('Vienna');
	const [changeValue, setChangeValue] = useState('');
	const [citiesWeather, setCitiesWeather] = useState([]);

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
	};

	const current = async () => {
		try {
			const res = await axios.get(url + submitValue);
			return res.data;
		} catch (error) {
			console.error(error.message);
		}
	};

	const addCity = () => {
		setCitiesWeather(citiesWeather, citiesWeather.push(cityWeather));
		clearForm();
	};

	const unpin = () => {
		const index = citiesWeather.indexOf(0);
		setCitiesWeather(citiesWeather, citiesWeather.splice(index, 1));
	};

	useEffect(() => {
		current().then(data => {
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

				<button
					onClick={addCity}
					type='button'
					className='ml-4 border-solid border-2 border-indigo-600 p-2 rounded-md text-indigo-800 text-xl font-semiboldfont-semibold bg-indigo-600 text-white'>
					<span>Add city</span>
				</button>
			</form>

			{submitValue && (
				<WeatherPanel
					cityWeather={cityWeather}
					unpinBtn={false}
				/>
			)}

			<ul className='grid grid-cols-4 gap-4'>
				{citiesWeather.map(element => (
					<WeatherPanel
						key={uid()}
						className='basis-1/4'
						cityWeather={element}
						unpin={unpin}
					/>
				))}
			</ul>
		</div>
	);
}

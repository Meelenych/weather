import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { uid } from 'uid';

import { url } from '../api/api';
import WeatherPanel from './weatherPanel/weatherPanel';

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
		setCitiesWeather([
			...citiesWeather,
			{ id: uid(), cityInfo: cityWeather.cityInfo },
		]);
		clearForm();
	};

	const unpin = id => {
		const updatedCitiesWeather = citiesWeather.filter(city => city.id !== id);
		setCitiesWeather(updatedCitiesWeather);
	};

	useEffect(() => {
		current().then(data => {
			setCityWeather({ id: uid(), cityInfo: data });
		});
	}, [submitValue]);

	console.log('cityWeather', cityWeather);
	console.log('citiesWeather', citiesWeather);

	return (
		<div
			className={
				cityWeather?.cityInfo.current.cloud > 50 ? 'bg-neutral-300' : 'bg-blue-300'
			}>
			<div className='container mx-auto p-4 list-none'>
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
						cityWeather={cityWeather?.cityInfo}
						unpinBtn={false}
					/>
				)}

				<ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
					{citiesWeather.map(element => (
						<WeatherPanel
							key={element.id}
							className='basis-1/4'
							cityWeather={element.cityInfo}
							unpin={() => unpin(element.id)}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}

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
		const isCityAlreadyAdded = citiesWeather.some(
			city => city.cityInfo.location.name === cityWeather.cityInfo.location.name,
		);

		if (isCityAlreadyAdded) {
			clearForm();
		} else {
			const updatedCitiesWeather = [
				...citiesWeather,
				{ id: uid(), cityInfo: cityWeather.cityInfo },
			];

			setCitiesWeather(updatedCitiesWeather);

			localStorage.setItem('myCities', JSON.stringify(updatedCitiesWeather));
			clearForm();
		}
	};

	const unpin = id => {
		const updatedCitiesWeather = citiesWeather.filter(city => city.id !== id);
		setCitiesWeather(updatedCitiesWeather);
		localStorage.setItem('myCities', JSON.stringify(updatedCitiesWeather));
	};

	useEffect(() => {
		const myCities = JSON.parse(localStorage.getItem('myCities')) || [];
		setCitiesWeather(myCities);
	}, []);

	useEffect(() => {
		const handleBeforeUnload = () => {
			localStorage.setItem('myCities', JSON.stringify(citiesWeather));
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [citiesWeather]);

	useEffect(() => {
		current().then(data => {
			setCityWeather({ id: uid(), cityInfo: data });
		});
	}, [submitValue]);

	return (
		<div
			className={
				cityWeather?.cityInfo.current.cloud > 50
					? 'bg-neutral-300 '
					: 'bg-blue-300 '
			}>
			<div className='container mx-auto list-none relative pr-4 pl-4'>
				<div
					className={
						cityWeather?.cityInfo.current.cloud > 50
							? 'bg-neutral-300 sticky top-4 overflow-y-auto'
							: 'bg-blue-300 sticky top-4 overflow-y-auto'
					}>
					<div className='bg-gradient-to-t from-blue-900 ... mt-4 font-semibold text-xl text-amber-200 p-3 rounded-tr-xl rounded-tl-xl w-full'>
						<form
							className='flex justify-center'
							onSubmit={handleSubmit}>
							<button
								type='submit'
								className='mr-4 border-solid border-2 border-blue-600 p-2 rounded-md text-indigo-800 text-xl font-semiboldfont-semibold bg-blue-600 text-white'>
								<span>Search</span>
							</button>

							<input
								type='text'
								autoComplete='off'
								placeholder='Search a city'
								onChange={handleChange}
								value={changeValue}
								className='border-solid border-2 border-blue-600 p-2 rounded-md text-blue-800 text-xl'
							/>

							<button
								onClick={addCity}
								type='button'
								className='ml-4 border-solid border-2 border-blue-600 p-2 rounded-md text-indigo-800 text-xl  bg-blue-600 text-white'>
								<span>Add city</span>
							</button>
						</form>

						<p className='text-left'>Search results</p>
					</div>

					{submitValue && (
						<WeatherPanel
							cityWeather={cityWeather?.cityInfo}
							unpinBtn={false}
						/>
					)}
				</div>
				<div className='mt-8'>
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
		</div>
	);
}

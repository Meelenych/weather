import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { uid } from 'uid';

import { url } from '../api/api';
import WeatherPanel from './weatherPanel/weatherPanel';

export default function Application() {
	const [cityWeather, setCityWeather] = useState(null);
	const [submitValue, setSubmitValue] = useState('Vienna');
	const [changeValue, setChangeValue] = useState('');
	const [citiesWeather, setCitiesWeather] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const myCities = JSON.parse(localStorage.getItem('myCities')) || [];
		setCitiesWeather(myCities);
	}, []);

	useEffect(() => {
		const handleBeforeUnload = async () => {
			await localStorage.setItem('myCities', JSON.stringify(citiesWeather));
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [citiesWeather]);

	const fetchData = async cityName => {
		try {
			setLoading(true);
			const res = await axios.get(url + cityName);
			return res.data;
		} catch (error) {
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const loadData = async () => {
			try {
				const data = await fetchData(submitValue);
				setCityWeather({ id: uid(), cityInfo: data });
			} catch (error) {
				console.error(error.message);
			}
		};

		loadData();
	}, [submitValue]);

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

	const addCity = async () => {
		const trimmedValue = changeValue.toLowerCase().trim();

		if (trimmedValue === '') {
			clearForm();
			return;
		}

		try {
			const data = await fetchData(trimmedValue);

			if (!data) {
				console.error('Data from API is undefined or empty.');
				clearForm();
				return;
			}

			const isCityAlreadyAdded = citiesWeather.some(
				city => city.cityInfo.location.name === data.location.name,
			);

			if (isCityAlreadyAdded) {
				clearForm();
				window.alert('City already added');
			} else {
				const updatedCitiesWeather = [
					...citiesWeather,
					{ id: uid(), cityInfo: data },
				];

				setCitiesWeather(updatedCitiesWeather);
				localStorage.setItem('myCities', JSON.stringify(updatedCitiesWeather));
				clearForm();
				window.alert('City successfully added');
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const unpin = id => {
		const updatedCitiesWeather = citiesWeather.filter(city => city.id !== id);
		setCitiesWeather(updatedCitiesWeather);
		localStorage.setItem('myCities', JSON.stringify(updatedCitiesWeather));
	};

	useEffect(() => {
		fetchData(submitValue).then(data => {
			setCityWeather({ id: uid(), cityInfo: data });
		});
	}, [submitValue]);

	const getContainerClasses = () =>
		`container mx-auto list-none relative pr-4 pl-4`;

	const getStickyPanelClasses = () =>
		`bg-gradient-to-t from-blue-900 to-white font-semibold text-xl text-amber-200 p-3 rounded-tr-xl rounded-tl-xl w-full ${
			cityWeather?.cityInfo?.current.cloud > 50 ? 'bg-neutral-300' : 'bg-blue-300'
		} sticky top-0 overflow-y-auto`;

	return (
		<div className={getContainerClasses()}>
			<div className={getStickyPanelClasses()}>
				<form
					className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'
					onSubmit={handleSubmit}>
					<input
						type='text'
						autoComplete='off'
						placeholder='Search a city'
						onChange={handleChange}
						value={changeValue}
						className='border-solid border-2 border-blue-600 p-2 rounded-md text-blue-800 text-xl'
					/>
					<button
						type='submit'
						className='border-solid border-2 border-blue-600 p-2 rounded-md text-indigo-800 text-xl font-semiboldfont-semibold bg-blue-600 text-white'>
						<span>Search</span>
					</button>
					<button
						onClick={addCity}
						type='button'
						className='border-solid border-2 border-blue-600 p-2 rounded-md text-indigo-800 text-xl  bg-blue-600 text-white'>
						<span>Add city</span>
					</button>
				</form>
				<p className='text-left pt-2'>
					{loading ? 'Loading data...' : 'Search results'}
				</p>
			</div>
			{submitValue && (
				<WeatherPanel
					cityWeather={cityWeather?.cityInfo}
					unpinBtn={false}
				/>
			)}
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
	);
}

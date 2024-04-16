import React, { useState, useEffect } from 'react';
import WeatherPanel from './weatherPanel/weatherPanel';
import axios from 'axios';
import { uid } from 'uid';
import { toast } from 'react-toastify';
import { url } from '../api/api';
import { fetchGeopify } from '../api/geopify';

export default function Application() {
	const [loading, setLoading] = useState(false);
	const [cityWeather, setCityWeather] = useState(null);
	const [citiesWeather, setCitiesWeather] = useState([]);
	const [submitValue, setSubmitValue] = useState('');
	const [changeValue, setChangeValue] = useState('');
	const [showResults, setShowResults] = useState(false);

	//Loading cities from local storage
	useEffect(() => {
		const myCities = JSON.parse(localStorage.getItem('myCities')) || [];
		if (Array.isArray(myCities)) {
			// console.log('myCities', myCities);
			setCitiesWeather(myCities);
		} else {
			console.error(
				'Data retrieved from local storage is not an array:',
				myCities,
			);
		}
	}, []);
	//Saving cities to local storage before closing tab
	useEffect(() => {
		const handleBeforeUnload = async () => {
			await localStorage.setItem('myCities', JSON.stringify(citiesWeather));
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [citiesWeather]);
	//Get user city name using IP address
	useEffect(() => {
		fetchGeopify().then(data => {
			// console.log('geopify', data);
			toast.info(`We found ${data.city.name} as closest city`);
			setSubmitValue(data.city.name);
		});
	}, []);

	const fetchData = async location => {
		try {
			setLoading(true);
			if (location) {
				const res = await axios.get(url + location);

				return res.data;
			}
		} catch (error) {
			console.error(error.message);
			toast.error(`Weather for ${location} could not be updated`);
		} finally {
			setLoading(false);
		}
	};

	const loadData = async locationName => {
		try {
			if (locationName || submitValue) {
				const data = await fetchData(locationName ? locationName : submitValue);
				setCityWeather({
					id: uid(),
					cityInfo: data,
					lastUpdate: new Date().toLocaleString(),
				});
				const updatedCitiesWeather = citiesWeather.map(city => {
					if (city.cityInfo.location.name === locationName) {
						return {
							id: city.id,
							cityInfo: data,
							lastUpdate: new Date().toLocaleString(),
						};
					} else {
						return city;
					}
				});
				console.log('updatedCitiesWeather', updatedCitiesWeather);
				setCitiesWeather(updatedCitiesWeather);
				localStorage.setItem('myCities', JSON.stringify(updatedCitiesWeather));
			}
		} catch (error) {
			console.error(error.message);
		}
	};
	//Save fetched data to state
	useEffect(() => {
		loadData();
	}, [submitValue]);

	const handleChange = e => {
		setChangeValue(e.currentTarget.value);
	};

	const onFormSubmit = data => {
		setSubmitValue(data);
		setShowResults(true);
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

	//Adds city to watchlist
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
				toast.error(`${cityWeather?.cityInfo?.location.name} already added`);
			} else {
				const updatedCitiesWeather = [
					...citiesWeather,
					{ id: uid(), cityInfo: data, lastUpdate: new Date().toLocaleString() },
				];
				setCitiesWeather(updatedCitiesWeather);
				localStorage.setItem('myCities', JSON.stringify(updatedCitiesWeather));
				clearForm();
				setShowResults(false);
				toast.success(`${cityWeather?.cityInfo?.location.name} added to your list`);
			}
		} catch (error) {
			console.error(error.message);
		}
	};
	//Removes city from watchlist
	const unpin = id => {
		const updatedCitiesWeather = citiesWeather.filter(city => city.id !== id);
		setCitiesWeather(updatedCitiesWeather);
		localStorage.setItem('myCities', JSON.stringify(updatedCitiesWeather));
	};

	return (
		<div className={`container mx-auto list-none`}>
			<div
				className={`grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 font-bold text-xl text-amber-700 p-3 rounded-tr-xl rounded-tl-xl w-full sticky top-0 overflow-y-auto z-50 ${
					cityWeather?.cityInfo?.current.is_day === 0
						? 'bg-gradient-to-t from-blue-900 to-white p-3'
						: 'bg-gradient-to-t from-blue-400 to-white p-3'
				}`}>
				<div>
					<p className='pt-2 pb-2'>Enter city or country name</p>
					<form
						className='grid grid-cols-1 gap-4 '
						onSubmit={handleSubmit}>
						<input
							type='text'
							autoComplete='off'
							placeholder='Search a city'
							onChange={handleChange}
							value={changeValue}
							className='border-solid border-2 border-blue-600 p-2 rounded-md text-blue-800 text-xl  focus:border-orange-500 outline-none'
						/>
						<button
							type='submit'
							className='border-solid border-2 border-blue-600 p-2 rounded-md  text-xl font-semiboldfont-semibold bg-blue-600  hover:border-orange-500 active:translate-y-0 active:bg-orange-500 active:border-orange-500 text-white'>
							<span>Search</span>
						</button>
						<button
							onClick={addCity}
							type='button'
							className='border-solid border-2 border-blue-600 p-2 rounded-md text-indigo-800 text-xl  bg-blue-600 hover:border-orange-500 active:translate-y-0 active:bg-orange-500 active:border-orange-500 text-white'>
							<span>Add {cityWeather?.cityInfo?.location.name} to your list</span>
						</button>
						<button
							onClick={() => setShowResults(false)}
							type='button'
							className='border-solid border-2 border-blue-600 p-2 rounded-md  text-xl font-semiboldfont-semibold bg-blue-600  hover:border-orange-500 active:translate-y-0 active:bg-orange-500 active:border-orange-500 text-white'>
							<span>Hide results</span>
						</button>
					</form>
				</div>
				<div>
					{showResults && (
						<div>
							<p className='text-left pt-2 pb-2'>
								{loading ? 'Loading data...' : 'Search results'}
							</p>
							{submitValue && (
								<div className='z-0 font-normal'>
									<WeatherPanel
										cityWeather={cityWeather?.cityInfo}
										unpinBtn={false}
									/>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			<div className='mt-4 z-0'>
				<ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
					{citiesWeather.map(element => (
						<WeatherPanel
							key={element.id}
							className='basis-1/4'
							cityWeather={element.cityInfo}
							unpin={() => unpin(element.id)}
							lastUpdate={element.lastUpdate}
							update={() => {
								loadData(element.cityInfo.location.name);
								toast.success(`Weather for ${element.cityInfo.location.name} updated`);
							}}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { uid } from 'uid';
import { ToastContainer, toast } from 'react-toastify';
import { url } from '../api/api';
import WeatherPanel from './weatherPanel/weatherPanel';
import { getLocation } from '../helpers/geolocation';
import { fetchIpGeolocation } from '../api/ipinfo';
import { getMyIP } from '../helpers/getIp';
import { fetchIpGeolocationFree } from '../api/ipinfofree';

export default function Application() {
	const [loading, setLoading] = useState(false);
	const [cityWeather, setCityWeather] = useState(null);
	const [submitValue, setSubmitValue] = useState('');
	const [changeValue, setChangeValue] = useState('');
	const [citiesWeather, setCitiesWeather] = useState([]);
	const [ip, setIp] = useState('');
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [ipGeolocation, setIpGeolocation] = useState(null);

	// useEffect(() => {
	// 	getLocation(locationData => {
	// 		console.log('locationData', locationData);
	// 		setLatitude(latitude);
	// 		setLongitude(longitude);
	// 	});
	// }, []);

	useEffect(() => {
		// fetchIpGeolocation().then(
		// 	data => {
		// 		console.log('data', data);
		// 		setIpGeolocation(data);
		// 		setSubmitValue(data.city);
		// 	},
		// 	error => {
		// 		console.log('error', error);
		// 	},
		// );
	}, []);

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

	// const fetchLocation = async () => {
	// 	try {
	// 		setLoading(true);
	// 		const res = await axios.get(url + `lat=${latitude}&lon=${longitude}`);
	// 		return res.data;
	// 	} catch (error) {
	// 		console.error(error.message);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	useEffect(() => {
		getMyIP().then(ip => {
			console.log('ip', ip);
			setIp(ip);
		});
	}, []);

	useEffect(() => {
		fetchIpGeolocationFree(ip).then(data => setSubmitValue(data.city));
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
		} finally {
			setLoading(false);
		}
	};

	// useEffect(() => {
	// 	const loadData = async () => {
	// 		try {
	// 			const data = await fetchLocation();
	// 			const locationName = data.location.name;
	// 			setSubmitValue(locationName);
	// 		} catch (error) {
	// 			console.error(error.message);
	// 		}
	// 	};
	// 	loadData();
	// }, []);

	useEffect(() => {
		const loadData = async () => {
			try {
				if (submitValue) {
					const data = await fetchData(submitValue);
					setCityWeather({ id: uid(), cityInfo: data });
				}
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
				toast.error(`${cityWeather?.cityInfo?.location.name} already added`);
			} else {
				const updatedCitiesWeather = [
					...citiesWeather,
					{ id: uid(), cityInfo: data },
				];

				setCitiesWeather(updatedCitiesWeather);
				localStorage.setItem('myCities', JSON.stringify(updatedCitiesWeather));
				clearForm();
				toast.success(`${cityWeather?.cityInfo?.location.name} added to your list`);
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

	return (
		<div className={`container mx-auto list-none relative`}>
			{/* <ToastContainer /> */}
			<div
				className={`font-semibold text-xl text-amber-200 p-3 rounded-tr-xl rounded-tl-xl w-full ${
					cityWeather?.cityInfo?.current.is_day === 0
						? 'bg-gradient-to-t from-blue-900 to-white p-3 '
						: 'bg-gradient-to-t from-blue-400 to-white p-3 '
				} sticky top-0 overflow-y-auto`}>
				<form
					className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'
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
						className='border-solid border-2 border-blue-600 p-2 rounded-md text-indigo-800 text-xl font-semiboldfont-semibold bg-blue-600  hover:border-orange-500 active:translate-y-0 active:bg-orange-500 active:border-orange-500 text-white'>
						<span>Search</span>
					</button>
					<button
						onClick={addCity}
						type='button'
						className='border-solid border-2 border-blue-600 p-2 rounded-md text-indigo-800 text-xl  bg-blue-600 hover:border-orange-500 active:translate-y-0 active:bg-orange-500 active:border-orange-500 text-white'>
						<span>Add {cityWeather?.cityInfo?.location.name} to your list</span>
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
			<div className='mt-4'>
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

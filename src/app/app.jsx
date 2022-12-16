import { useState, useEffect } from "react";
import { url } from "../api/api";
import WeatherPanel from "./weatherPanel/weatherPanel";

export default function Application() {
	const [cityWeather, setCityWeather] = useState([]);
	const [submitValue, setSubmitValue] = useState("Vienna");
	const [changeValue, setChangeValue] = useState("");

	const onFormSubmit = (data) => {
		setSubmitValue(data);
	};

	const handleChange = (e) => {
		setChangeValue(e.currentTarget.value);
	};

	const clearForm = () => {
		setChangeValue("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (changeValue.trim() === "") {
			clearForm();
			return;
		}
		onFormSubmit(changeValue.toLowerCase().trim());
		clearForm();
	};

	useEffect(() => {
		fetch(url + submitValue)
			.then((result) => result.json())
			.then((data) => setCityWeather(data))
			.catch((err) => console.error(err));
	}, [submitValue]);

	// console.log(cityWeather);

	// console.log(submitValue, changeValue);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<button type="submit">
					<span>Search</span>
				</button>

				<input
					type="text"
					autoComplete="off"
					placeholder="Search a city"
					onChange={handleChange}
					value={changeValue}
				/>
			</form>

			{submitValue !== "" ? <WeatherPanel cityWeather={cityWeather} /> : ""}
		</div>
	);
}

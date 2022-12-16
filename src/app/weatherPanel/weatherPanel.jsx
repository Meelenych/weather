export default function WeatherPanel({ cityWeather }) {
	// console.log("cityWeather", cityWeather);
	return (
		<>
			<p>Country: {cityWeather.location.country}</p>
			<p>City: {cityWeather.location.name}</p>
			<p>
				Feels like: {cityWeather.current.feelslike_c} <span>&#176;</span>C
			</p>
			<p>
				Temperature: {cityWeather.current.temp_c} <span>&#176;</span>C
			</p>
			<img src={`http://${cityWeather?.current.condition.icon.slice(2)}`} />
		</>
	);
}

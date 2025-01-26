const APIkey = '?key=f0e72a5b37ab461296383508221612';
const baseURL = 'https://api.weatherapi.com/v1';
const parameters = '/current.json';
const forecastParameters = '/forecast.json'
const days = '&days=7'
const query = '&q='

export const url = baseURL + parameters + APIkey + query;
export const forecastUrl = baseURL + forecastParameters + APIkey + query;

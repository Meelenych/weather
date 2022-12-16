const APIkey = "?key=" + "f0e72a5b37ab461296383508221612";

const baseURL = "http://api.weatherapi.com/v1";

const parameters = "/current.json";

// const query = "&q=Paris";

export const url = baseURL + parameters + APIkey + "&q=";

//http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London

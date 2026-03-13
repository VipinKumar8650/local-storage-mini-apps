const container = document.getElementById("weatherContainer");
const loader = document.getElementById("loader");

const cities = ["Delhi","London","Tokyo"];

function getWeatherEmoji(code){

if(code === 0) return {text:"Clear",emoji:"☀️"};
if(code <= 3) return {text:"Cloudy",emoji:"☁️"};
if(code <= 55) return {text:"Drizzle",emoji:"🌦"};
if(code <= 65) return {text:"Rain",emoji:"🌧"};
if(code <= 75) return {text:"Snow",emoji:"❄️"};

return {text:"Weather",emoji:"🌡"};
}


// city → coordinates
async function getCoordinates(city){

const response = await fetch(
`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
);

if(!response.ok) throw new Error("Geocoding error");

const data = await response.json();

if(!data.results) throw new Error("City not found");

return {
city: city,
lat: data.results[0].latitude,
lon: data.results[0].longitude
};

}


// coordinates → weather
async function getWeather(cityData){

const response = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${cityData.lat}&longitude=${cityData.lon}&current_weather=true`
);

if(!response.ok) throw new Error("Weather API error");

const data = await response.json();

return {
city: cityData.city,
temperature: data.current_weather.temperature,
code: data.current_weather.weathercode
};

}


async function loadWeather(){

loader.style.display="block";

try{

// get coordinates simultaneously
const coords = await Promise.all(cities.map(getCoordinates));

// get weather simultaneously
const weatherData = await Promise.all(coords.map(getWeather));

container.innerHTML="";

weatherData.forEach(data=>{

const weather = getWeatherEmoji(data.code);

const card = document.createElement("div");
card.className="card";

card.innerHTML=`
<div class="city">${data.city}</div>
<div class="temp">${data.temperature}°C</div>
<div class="condition">${weather.emoji} ${weather.text}</div>
`;

container.appendChild(card);

});

}catch(error){

container.innerHTML="<h2>⚠️ Failed to load weather data</h2>";

}

loader.style.display="none";

}

loadWeather();
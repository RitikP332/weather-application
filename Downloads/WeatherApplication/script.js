const apiKey = 'f91354da343745dc1405bf15570fcd9e'; //  weather API key 
OpenWeatherMap
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showPosition(position) {
    const { latitude, longitude } = position.coords;
    getWeather(latitude, longitude);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function getWeather(lat, lon) {
    const url = `${weatherApiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeather(data) {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const alertElement = document.getElementById('alert');

    locationElement.textContent = `Location: ${data.name}, ${data.sys.country}`;
    temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
    descriptionElement.textContent = `Weather: ${data.weather[0].description}`;

    const weatherCondition = data.weather[0].main.toLowerCase();
    document.body.className = ''; // Clear any existing weather classes

    switch (weatherCondition) {
        case 'clear':
            document.body.classList.add('sunny');
            break;
        case 'clouds':
            document.body.classList.add('cloudy');
            break;
        case 'rain':
        case 'drizzle':
            document.body.classList.add('rainy');
            break;
        case 'thunderstorm':
            document.body.classList.add('thunderstorm');
            break;
        case 'snow':
            document.body.classList.add('snowy');
            break;
        default:
            document.body.classList.add('sunny');
    }

    if (weatherCondition === 'thunderstorm' || weatherCondition === 'tornado') {
        alertElement.textContent = 'ALERT: Severe weather conditions!';
    } else {
        alertElement.textContent = '';
    }
}

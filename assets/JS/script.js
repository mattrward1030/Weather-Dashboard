// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var weatherContainer = document.getElementById('weather-info')
var weatherData = "https://api.openweathermap.org/data/2.5/onecall?lat=39.9526&lon=75.1652&appid=970bf4867656ea18a3d31d39295c5b09";

function getWeather() {
    fetch(weatherData)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var currentTemp = document.createElement("p");
                currentTemp.textContent = data[i].currentTemp;
                weatherContainer.append(currentTemp);
            }
        });
}

getWeather()
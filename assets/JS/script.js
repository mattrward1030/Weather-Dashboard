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
var apiKey = "970bf4867656ea18a3d31d39295c5b09";
var search = $(".searchButton");


var keyCount = 0;
search.click(function () {

    var userInput = $(".userInput").val();

    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&Appid=" + apiKey + "&units=imperial";

    var fiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&Appid=" + apiKey + "&units=imperial";

    if (userInput === "") {
        alert("PLEASE ENTER A CITY")
    }
    else {
        fetch(currentWeather)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var cityName = $(".list-group").addClass("list-group-item");
                cityName.append("<li>" + data.name + "</li>");
                var local = localStorage.setItem(keyCount, data.name);
                keyCount = keyCount + 1;
            })
    }
})

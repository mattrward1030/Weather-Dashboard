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
                var city = $(".list-group").addClass("list-group-item");
                city.append("<li>" + data.name + "</li>");
                var local = localStorage.setItem(keyCount, data.name);
                keyCount = keyCount + 1;

                var currentCard = $(".currentCard").append("<div>").addClass("card-body");
                currentCard.empty();
                var cityName = currentCard.append("<p>");
                currentCard.append(cityName);

                var time = new Date(data.dt * 1000);
                cityName.append(" " + time.toLocaleDateString("en-US"));
                cityName.append(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`);

                var cityTemp = cityName.append("<p>");

                cityName.append(cityTemp);
                cityTemp.append("<p>" + "Temperature: " + data.main.temp + " °F" + "</p>");
                cityTemp.append("<p>" + "Humidity: " + data.main.humidity + " %" + "</p>");
                cityTemp.append("<p>" + "Wind Speed: " + data.wind.speed + " mph" + "</p>");


                var uvUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${data.coord.lat}&lon=${data.coord.lon}`;


                fetch(uvUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        var uvIndex = cityTemp.append("<p>" + "UV Index: " + data.value + "</p>").addClass("card-text")
                        if (uvIndex < 3) {
                            $(this).addClass("acceptable")
                        }
                        console.log(data)

                    });
            })
    }
})

const apiKey = '0b60c186cce459381374b8bf5b45c1c7';
var lat;
var lon;
let cityName = 'Austin';
var weatherUrlByCity = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;

//The request city url function will take the user's input city and get the lattitude and longitude of that 
//city from the api request.  It will then pass those lat and lon into the weatherUrl parameters to then
//fetch the weather from that city by calling the getWeather function.
function getLatLon(requestCityUrl) { 
    fetch(requestCityUrl).then(function(response) {
        if(response.status != 200) {
            console.log('Status Error')
        } else {
            return response.json();
        }
    }).then(function(data) {
        //The below saves the lat and lon from the api request so we can pass them into the parameters
        //of the weatherUrl so that we can then request the weather of that city the user input.
        lat = data[0].lat;
        lon = data[0].lon;
        var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=0b60c186cce459381374b8bf5b45c1c7';
        
        var latEl = document.getElementById('latEl');
        var lonEl = document.getElementById('lonEl');

        latEl.innerHTML = lat;
        lonEl.innerHTML = lon;
        //Below calls the getWeather function, that is created further down, inside the getLatLon function.
        getWeather(weatherUrl);
    })
};

function getWeather(requestWeatherUrl) {
    fetch(requestWeatherUrl).then(function(response) {
        if(response.status != 200) {
            console.log('Status Error');
        } else {
            return response.json();
        }
    }).then(function(data) {
        console.log(data);
    })
}

getLatLon(weatherUrlByCity);

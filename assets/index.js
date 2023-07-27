const apiKey = '0b60c186cce459381374b8bf5b45c1c7';
var now = dayjs();
var lat;
var lon;
let cityName = 'Austin';
var weatherUrlByCity = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
var todaysHumidityEl = document.getElementById('todays-humidity');
var todaysTempEl = document.getElementById('todays-temp');
var todaysWindEl = document.getElementById('todays-wind');
var todaysWeatherIconEl = document.getElementById('todays-icon');
var submitButton = document.getElementById('submit-button');
var cityEl = document.getElementById('city');
var dateEl = document.getElementById('date');
dateEl.innerHTML = dayjs().format('(MM/DD/YYYY)')
var dayOne = Number(dayjs().format('DD')) + 1;
var dayOneString = dayOne.toString();
var dayTwo = Number(dayjs().format('DD')) + 2;
var dayTwoString = dayTwo.toString();
var dayThree = Number(dayjs().format('DD')) + 3;
var dayThreeString = dayThree.toString();
var dayFour = Number(dayjs().format('DD')) + 4;
var dayFourString = dayFour.toString();
var dayFive = Number(dayjs().format('DD')) + 5;
var dayFiveString = dayFive.toString();
var dayOneDate = dayjs().format(('MM/' + dayOneString + '/YYYY'));
var dayTwoDate = dayjs().format(('MM/' + dayTwoString + '/YYYY'));
var dayThreeDate = dayjs().format(('MM/' + dayThreeString + '/YYYY'));
var dayFourDate = dayjs().format(('MM/' + dayFourString + '/YYYY'));
var dayFiveDate = dayjs().format(('MM/' + dayFiveString + '/YYYY'));


//The below function takes in degrees kelvin and returns it in Fehrenheit
function kelvinToFahrenheit(kelvin) {
    var fahrenheit = Math.round((kelvin - 273.15) * 9/5 + 32);
    return fahrenheit;
  }

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
        var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

        var latEl = document.getElementById('latEl');
        var lonEl = document.getElementById('lonEl');

        //Below calls the getWeather function, that is created further down, inside the getLatLon function.
        getWeather(weatherUrl);
        getForecast(forecastUrl);
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
        var todaysHumidity = data.list[0].main.humidity;
        var todaysTemp =  kelvinToFahrenheit(data.list[0].main.temp);
        var todaysWind = data.list[0].wind.speed;
        var todaysIcon = data.list[0].weather[0].icon;
        var todaysIconUrl = 'https://openweathermap.org/img/wn/' + todaysIcon + '.png'
        todaysHumidityEl.innerHTML = 'Humidity: ' + todaysHumidity + '%';
        todaysTempEl.innerHTML = 'Temp: ' + todaysTemp + ' F';
        todaysWindEl.innerHTML = 'Wind: ' + todaysWind + 'MPH';
        document.getElementById('todays-icon').setAttribute('src', todaysIconUrl);
    })
}

// getLatLon(weatherUrlByCity);

function getForecast(requestForecastUrl) {
    fetch(requestForecastUrl).then(function(response) {
        if(response.status != 200) {
            console.log('Status Error')
        } else {
            return response.json();
        }
    }).then(function(data) {
        var dayOneHumidity = data.list[1].main.humidity;
        var dayTwoHumidity = data.list[2].main.humidity;
        var dayThreeHumidity = data.list[3].main.humidity;
        var dayFourHumidity = data.list[4].main.humidity;
        var dayFiveHumidity = data.list[5].main.humidity;
        //Above is day 1-5 of forecast's humidity

        var dayOneTemp =  kelvinToFahrenheit(data.list[1].main.temp);
        var dayTwoTemp =  kelvinToFahrenheit(data.list[2].main.temp);
        var dayThreeTemp =  kelvinToFahrenheit(data.list[3].main.temp);
        var dayFourTemp =  kelvinToFahrenheit(data.list[4].main.temp);
        var dayFiveTemp =  kelvinToFahrenheit(data.list[5].main.temp);
        //Above is day 1-5 of forecast's temperature

        var dayOneWind = data.list[1].wind.speed;
        var dayTwoWind = data.list[2].wind.speed;
        var dayThreeWind = data.list[3].wind.speed;
        var dayFourWind = data.list[4].wind.speed;
        var dayFiveWind = data.list[5].wind.speed;
        //Above is day 1-5 of forecast's wind speed

        var dayOneIcon = data.list[1].weather[0].icon;
        var dayTwoIcon = data.list[2].weather[0].icon;
        var dayThreeIcon = data.list[3].weather[0].icon;
        var dayFourIcon = data.list[4].weather[0].icon;
        var dayFiveIcon = data.list[5].weather[0].icon;
        //Above is day 1-5 of forecast's weather icons

        var dayOneIconUrl = 'https://openweathermap.org/img/wn/' + dayOneIcon + '.png'
        var dayTwoIconUrl = 'https://openweathermap.org/img/wn/' + dayTwoIcon + '.png'
        var dayThreeIconUrl = 'https://openweathermap.org/img/wn/' + dayThreeIcon + '.png'
        var dayFourIconUrl = 'https://openweathermap.org/img/wn/' + dayFourIcon + '.png'
        var dayFiveIconUrl = 'https://openweathermap.org/img/wn/' + dayFiveIcon + '.png'

        document.getElementById('d1weathericon').setAttribute('src', dayOneIconUrl);
        document.getElementById('d2weathericon').setAttribute('src', dayTwoIconUrl);
        document.getElementById('d3weathericon').setAttribute('src', dayThreeIconUrl);
        document.getElementById('d4weathericon').setAttribute('src', dayFourIconUrl);
        document.getElementById('d5weathericon').setAttribute('src', dayFiveIconUrl);

        document.getElementById('d1humidity').innerHTML = 'Humidity: ' + dayOneHumidity + '%';
        document.getElementById('d2humidity').innerHTML = 'Humidity: ' + dayTwoHumidity + '%';
        document.getElementById('d3humidity').innerHTML = 'Humidity: ' + dayThreeHumidity + '%';
        document.getElementById('d4humidity').innerHTML = 'Humidity: ' + dayFourHumidity + '%';
        document.getElementById('d5humidity').innerHTML = 'Humidity: ' + dayFiveHumidity + '%';
        //Above sets the html for day 1-5 humidity

        document.getElementById('d1temp').innerHTML = 'Temp: ' + dayOneTemp + ' F';
        document.getElementById('d2temp').innerHTML = 'Temp: ' + dayTwoTemp + ' F';
        document.getElementById('d3temp').innerHTML = 'Temp: ' + dayThreeTemp + ' F';
        document.getElementById('d4temp').innerHTML = 'Temp: ' + dayFourTemp + ' F';
        document.getElementById('d5temp').innerHTML = 'Temp: ' + dayFiveTemp + ' F';
        //Above sets the html for day 1-5 temperature

        document.getElementById('d1wind').innerHTML = 'Wind: ' + dayOneWind + 'MPH';
        document.getElementById('d2wind').innerHTML = 'Wind: ' + dayTwoWind + 'MPH';
        document.getElementById('d3wind').innerHTML = 'Wind: ' + dayThreeWind + 'MPH';
        document.getElementById('d4wind').innerHTML = 'Wind: ' + dayFourWind + 'MPH';
        document.getElementById('d5wind').innerHTML = 'Wind: ' + dayFiveWind + 'MPH';
        //Above sets the html for day 1-5 wind speed

        document.getElementById('d1weathericon').innerHTML = dayOneIcon;
        document.getElementById('d2weathericon').innerHTML = dayTwoIcon;
        document.getElementById('d3weathericon').innerHTML = dayThreeIcon;
        document.getElementById('d4weathericon').innerHTML = dayFourIcon;
        document.getElementById('d5weathericon').innerHTML = dayFiveIcon;
        //Above sets the html for day 1-5 icon

        document.getElementById('d1date').innerHTML = dayOneDate;
        document.getElementById('d2date').innerHTML = dayTwoDate;
        document.getElementById('d3date').innerHTML = dayThreeDate;
        document.getElementById('d4date').innerHTML = dayFourDate;
        document.getElementById('d5date').innerHTML = dayFiveDate;
        //Above sets the html for day 1-5 date
    })
}

function inputResults() {
    var inputValue = document.getElementById('city-search-bar').value;
    cityName = inputValue.toString();
    weatherUrlByCity = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    cityEl.innerHTML = cityName;
}

// The below code waits for a button click and changes the current city to what
// the user inputs and pull the weather for that city to populate the browser.
// It then clears the input in the form again.
submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    inputResults();
    getLatLon(weatherUrlByCity);
})


// Need to do:
// Find out how to actually post the icon to the page from the icon pulled from the API
// Find future dates in api call and post them to the Five Day Forecast section.
// Add dayjs to pull in today's date.
// Append each city the user inputs into a list below the form so a user can click on it again.
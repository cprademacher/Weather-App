var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0b60c186cce459381374b8bf5b45c1c7';
var apiKey = '0b60c186cce459381374b8bf5b45c1c7';
var userLat = '';
var userLong = '';

fetch(weatherUrl).then(function(response) {
    return response.json();
}).then(function(data) {
    console.log(data);
})
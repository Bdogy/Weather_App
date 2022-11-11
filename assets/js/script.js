var userInput = $("#citySearch");
var formButton = $("#submit");
var url =
  "api.openweathermap.org/data/2.5/forecast?lat=51.5073219&lon=-0.1276474&units=imperial&appid=569d785adfe9b44db482c835162b2e7a";

//grabs lat and lon of city
function lonLatLocation(city) {
  console.log(city);
  var urlLatLon =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=569d785adfe9b44db482c835162b2e7a";
  console.log(urlLatLon);
  fetch(urlLatLon)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      city = data[0];
      cityLat = city.lat;
      cityLon = city.lon;
      fetchWeather(cityLat, cityLon);
    });
}
//form submission function
function fetchWeather(city) {
  console.log(city);
}

formButton.click(function (event) {
  event.preventDefault();
  input = userInput.val();
  lonLatLocation(input);
});

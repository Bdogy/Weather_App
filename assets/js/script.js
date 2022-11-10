var userInput = $("#citySearch");
var formButton = $("#submit");
var url =
  "api.openweathermap.org/data/2.5/forecast?lat=10&lon=10&appid=569d785adfe9b44db482c835162b2e7a";
var urlLatLon =
  "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=569d785adfe9b44db482c835162b2e7a";
//form submission function
function fetchWeather(city) {
  console.log(city);
}

formButton.click(function (event) {
  event.preventDefault();
  input = userInput.val();
  fetchWeather(input);
});

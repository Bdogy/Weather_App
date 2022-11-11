var userInput = $("#citySearch");
var formButton = $("#submit");
var box = $("#CardBox");
var today = $("#todayCard");
//appends info to document
function appendToDocument(fiveDayArr) {
  card = $("<div>");
  iconEl = $("<img>");
  dateEl = $("<h3>");
  tempEl = $("<h4>");
  windEl = $("<p>");
  humidEl = $("<p>");
  //splits dt text by space and grabs numeric date only not time
  date = fiveDayArr[0].dt_txt.split(" ")[0];

  dateEl.text("City" + " " + "(" + date + ")");
  tempEl.text(fiveDayArr[0].main.temp + "F");
  tempEl.text(fiveDayArr[0].wind.speed + "MPH");
  today.append(dateEl);
  today.append(tempEl);

  //   for (let i = 1; i < fiveDayArr.length; i++) {}
}

//create weather cards and appends to document
function filterTimes(arr) {
  var fiveDayArr = [];
  for (let i = 0; i < arr.length - 6; i++) {
    fiveDayArr = fiveDayArr.concat(arr[i]);
    i += 7;
    console.log(i);
  }
  console.log(fiveDayArr);
  appendToDocument(fiveDayArr);
}

//gets weather for city
function fetchWeather(lat, lon) {
  var url =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=569d785adfe9b44db482c835162b2e7a";
  fetch(url)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.list);
      filterTimes(data.list);
    });
}
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

formButton.click(function (event) {
  event.preventDefault();
  input = userInput.val();
  lonLatLocation(input);
});

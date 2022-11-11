var userInput = $("#citySearch");
var formButton = $("#submit");
var box = $("#CardBox");
var today = $("#todayCard");
var pastSearchBox = $("#pastSearch");
var pastSearch = [];

//appends latest search and stores in localStorage
function save() {
  console.log(pastSearch);
  if (JSON.parse(localStorage.getItem("searches")) !== null) {
    pastSearch = pastSearch.concat(
      JSON.parse(localStorage.getItem("searches"))
    );
    for (let i = 0; i < pastSearch.length; i++) {
      cityEl = $("<button>");
      cityEl.text(pastSearch[i]);
      pastSearchBox.append(cityEl);
    }
  }
  return pastSearch;
}

function store(city) {
  pastSearch.push(city);
  console.log(pastSearch);
  cityEl = $("<button>");
  for (let i = 0; i < 5; i++) {
    cityEl.text(pastSearch[i]);
    pastSearchBox.append(cityEl);
  }
  localStorage.setItem("searches", JSON.stringify(pastSearch));
}

//appends info to document
function appendCurrentWeather(data) {
  var iconEl = $("<img>");
  var dateEl = $("<h3>");
  var tempEl = $("<h4>");
  var windEl = $("<p>");
  var humidEl = $("<p>");
  icon = data.weather[0].icon;
  dateEl.text(data.name + " today");
  tempEl.text("Temp " + data.main.temp + "F");
  windEl.text("Wind " + data.wind.speed + "MPH");
  humidEl.text("Humidity " + data.main.humidity + "%");
  iconEl.attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
  today.append(iconEl);
  today.append(dateEl);
  today.append(tempEl);
  today.append(humidEl);
  today.append(windEl);
}

//appends 5 day forecast to document
function appendToDocument(data) {
  for (let i = 0; i < data.length; i++) {
    icon = data[i].weather[0].icon;
    var iconEl = $("<img>");
    var dateEl = $("<h3>");
    var tempEl = $("<h4>");
    var windEl = $("<p>");
    var humidEl = $("<p>");
    console.log("appendToDocument");
    var card = $("<div>");
    dateEl.text(data[i].dt_txt.split(" ")[0]);
    tempEl.text("Temp " + data[i].main.temp + "F");
    windEl.text("Wind " + data[i].wind.speed + "MPH");
    humidEl.text("Humidity " + data[i].main.humidity + "%");
    iconEl.attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
    card.append(iconEl);
    card.append(dateEl);
    card.append(tempEl);
    card.append(humidEl);
    card.append(windEl);

    card.addClass("cards");
    card.addClass("m-3");
    box.append(card);
  }
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

function currentWeather(lat, lon) {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=569d785adfe9b44db482c835162b2e7a";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      appendCurrentWeather(data);
    });
}

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
      filterTimes(data.list);
    })
    .then(function () {
      currentWeather(lat, lon);
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

save();

formButton.click(function (event) {
  event.preventDefault();
  input = userInput.val();
  store(input);
  lonLatLocation(input);
});

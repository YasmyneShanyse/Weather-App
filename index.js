function displayTemperature(response) {
let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement =  document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

 iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
cityElement.innerHTML = response.data.city;
descriptionElement.innerHTML = `, ${response.data.condition.description}`;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${response.data.wind.speed} Mph`;
temperatureElement.innerHTML = temperature;

getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "cf17146b9t0acbba0b058ddo95f03448";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
 axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit (event) {
 event.preventDefault();
 let searchInputElement = document.querySelector("#search-input");
 searchCity(searchInput.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "cf17146b9t0acbba0b058ddo95f03448";
  let apiUrl =
    `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
console.log(response.data);

let forecastElement = document.querySelector("#forecast");
let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
let forecastHTML = "";
days.forEach(function (day) {
forecastHTML = forecastHTML + `
                      <div class="weather-forecast=day">
                      <div class="weather=forecast-date">${day}</div>
                      <div class="weather-forecast-icon">⛅</div>
                      <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-teemperature-max"><strong>60°</strong></span>
                        <span class="weather-forecast-temperature-min">40°</span>
                    </div>
                </div>`;
}
);
forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);


searchCity("Paris");

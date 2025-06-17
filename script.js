// const url = 'https://weatherapi-com.p.rapidapi.com/alerts.json?q=Attock';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '074bc4632emshee2abe59726048fp1bbaeejsna1f83930da1b',
// 		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
// 	}
// };

// async function fetchWeather() {
// 	try {
// 		const response = await fetch(url, options);
// 		const result = await response.text();
// 		console.log(result);
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// fetchWeather();

const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weatherImg");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const locNotFon = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body")


async function checkWeather(city) {
  const api_key = "cdc33efc04c89248932e884e334b71ad";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    locNotFon.style.display = "flex";
	weatherBody.style.display = "none";
    return;
}
else{
	weatherBody.style.display = "flex";
	locNotFon.style.display = "none";

  }

  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  windSpeed.innerHTML = `${weather_data.wind.speed}km/h`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weatherImg.src = "assets/cloud.png";
      break;

    case "Clear":
      weatherImg.src = "assets/clear.png";
      break;

    case "Rain":
      weatherImg.src = "assets/rain.png";
      break;

    case "Mist":
      weatherImg.src = "assets/mist.png";
      break;

    case "Snow":
      weatherImg.src = "assets/snow.png";
      break;
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

inputBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    checkWeather(inputBox.value);
  }
});

import { get_day_name } from "./Other_functions";
import { clear_section } from "./DOM_functions";

const get_api_key = () => "58870e7945eeb6b9b2d5e086112bce8c";

const ICON_TEST = document.getElementById("icon-test");
const CITY_NAME_HTML = document.getElementById("city-name");
const TODAY_HTML = document.getElementById("today");

const WEATHER_FORECAST_HTML = document.querySelector(
  ".weather-forecast"
);

// Hourly

//https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${key}

const test_api = (city_name, key) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${key}&units=metric`
  )
    .then(function (data) {
      if (data.ok) {
        return data.json();
      }
      throw new Error("Invalid city or connection error");
    })
    .then(function (json_data) {
      // TODO Detailed forecast - humidity, wind-speed (m/s), cloudiness (%),

      const weather_data_array = [];
      console.log(json_data);
      const city = json_data.city.name;
      CITY_NAME_HTML.textContent = city;

      // Getting the weather of 5 days
      clear_section(WEATHER_FORECAST_HTML);
      for (let i = 0; i < json_data.list.length; i += 8) {
        // adding the main data
        const weather_data = {};
        weather_data.main = {};

        console.log(json_data.list[i]);
        const date_arr = json_data.list[i].dt_txt
          .slice(0, 10)
          .split("-");
        // Date String
        const date_obj = new Date(
          date_arr[0],
          date_arr[1] - 1,
          date_arr[2]
        );
        const date_str = date_obj.toLocaleString("en-us", {
          month: "short",
          year: "numeric",
          day: "numeric",
        });
        if (i === 0) {
          TODAY_HTML.textContent = date_str;
        }
        const day_str = get_day_name(date_obj.getDay());
        weather_data.main.date = {
          Date: date_str,
          day_str: day_str,
        };

        console.log(day_str);
        // Temperatures
        const temperature = Math.round(json_data.list[i].main.temp);
        weather_data.main.temperature = temperature;

        // Short weather description
        const weather_description =
          json_data.list[i].weather[0].description;
        weather_data.main.description = weather_description;
        // Gets the logos name and URL to the logo .png file
        const logo_name = json_data.list[i].weather[0].icon + ".png";
        const logo_url =
          " http://openweathermap.org/img/wn/" + logo_name;
        weather_data.main.logo = logo_url;

        // Adding the details data

        weather_data.details = {};

        weather_data.details.clouds = json_data.list[i].clouds.all;
        weather_data.details.humidity =
          json_data.list[i].main.humidity;
        weather_data.details.wind_speed =
          json_data.list[i].wind.speed;

        weather_data_array.push(weather_data);
      }
      return weather_data_array;
    })
    .then(function (weather_data) {
      console.log(weather_data);
      for (let i = 0; i < weather_data.length; i++) {
        const forecast_div = document.createElement("div");
        forecast_div.className = "forecast";

        const main_div = document.createElement("div");
        main_div.className = "main";

        const forecast_day_div = document.createElement("h2");
        forecast_day_div.id = "forecast-day";
        if (i === 0) {
          forecast_day_div.textContent = "Today";
        } else {
          forecast_day_div.textContent =
            weather_data[i].main.date.day_str;
        }

        const forecast_image = document.createElement("img");
        forecast_image.id = "forecast-image";
        forecast_image.src = weather_data[i].main.logo;

        const temperature_div = document.createElement("h3");
        temperature_div.id = "forecast-temperature";
        temperature_div.textContent = `Temperature: ${weather_data[i].main.temperature} C°`;

        const description_div = document.createElement("p");
        description_div.id = "forecast-description";
        description_div.textContent = `Description: ${weather_data[i].main.description}`;

        const details_div = document.createElement("div");
        details_div.className = "details";

        const forecast_date = document.createElement("p");
        forecast_date.id = "forecast-date";
        forecast_date.textContent = `Date: ${weather_data[i].main.date.Date}`;

        const humidity = document.createElement("p");
        humidity.id = "forecast-humidity";
        humidity.textContent = `Humidity: ${weather_data[i].details.humidity} %`;

        const wind_speed = document.createElement("p");
        wind_speed.id = "forecast-wind";
        wind_speed.textContent = `Wind speed: ${weather_data[i].details.wind_speed} m/s`;

        const cloudiness = document.createElement("p");
        cloudiness.id = "cloudiness";
        cloudiness.textContent = `Cloudiness: ${weather_data[i].details.clouds} %`;

        main_div.appendChild(forecast_day_div);
        main_div.appendChild(forecast_image);
        main_div.appendChild(temperature_div);
        main_div.appendChild(description_div);

        details_div.appendChild(forecast_date);
        details_div.appendChild(humidity);
        details_div.appendChild(wind_speed);
        details_div.appendChild(cloudiness);

        forecast_div.appendChild(main_div);
        forecast_div.appendChild(details_div);
        WEATHER_FORECAST_HTML.appendChild(forecast_div);
      }
    });
};
/*
                <div class="forecast">
                    <div class="main">
                        <h2 id="forecast-day">Sunday</h2>
                        <img src="http://openweathermap.org/img/wn/04d.png" id="forecast-image">
                        <h3 id="forecast-temperature">Temperature: 37 C°</h3>
                        <p id="forecast-description">Description: Rainy</p>
                        <button id="forecast-btn">↓</button>
                    </div>
                    <div class="details">
                        <p id="forecast-date">Date: Jul 23, 2022</p>
                        <p id="forecast-humidity">Humidity: 63% </p>
                        <p id="wind-speed">Wind Speed: 3.45m/s</p>
                        <p id="cloudiness">Cloudiness: 12%</p>
                    </div>
                </div>
*/

export { test_api, get_api_key };

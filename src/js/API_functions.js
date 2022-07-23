import { get_day_name } from "./Other_functions";

const get_api_key = () => "58870e7945eeb6b9b2d5e086112bce8c";

const ICON_TEST = document.getElementById("icon-test");
const CITY_NAME_HTML = document.getElementById("city-name");
const TODAY_HTML = document.getElementById("today");

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
      const weather_data_array = [];
      console.log(json_data);
      const city = json_data.city.name;
      CITY_NAME_HTML.textContent = city;

      // Getting the weather of 5 days
      for (let i = 0; i < json_data.list.length; i += 8) {
        const weather_data = {};
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
        weather_data.date = {
          Date: date_str,
          day_str: day_str,
        };

        console.log(day_str);
        // Temperatures
        const temperature = Math.round(json_data.list[i].main.temp);
        const min_temp = Math.round(json_data.list[i].main.temp_min);
        const max_temp = Math.round(json_data.list[i].main.temp_max);
        weather_data.temperature = {
          avg_temp: temperature,
          min_temp: min_temp,
          max_temp: max_temp,
        };

        // Short weather description
        const weather_description =
          json_data.list[i].weather[0].description;
        weather_data.description = weather_description;
        // Gets the logos name and URL to the logo .png file
        const logo_name = json_data.list[i].weather[0].icon + ".png";
        const logo_url =
          " http://openweathermap.org/img/wn/" + logo_name;
        weather_data.logo = logo_url;
        console.log(logo_url);
        weather_data_array.push(weather_data);
      }
      return weather_data_array;
    })
    .then(function (weather_data) {
      console.log(weather_data);
    });
};

export { test_api, get_api_key };

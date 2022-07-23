import { get_day_name } from "./Other_functions";

const get_api_key = () => "58870e7945eeb6b9b2d5e086112bce8c";

const ICON_TEST = document.getElementById("icon-test");

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
      console.log(json_data);
      const city = json_data.city.name;

      // Getting the weather of 5 days
      for (let i = 0; i < json_data.list.length; i += 8) {
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
        const day_str = get_day_name(date_obj.getDay());
        console.log(day_str);
        // Temperatures
        const temperature = Math.round(json_data.list[i].main.temp);
        const min_temp = Math.round(json_data.list[i].main.temp_min);
        const max_temp = Math.round(json_data.list[i].main.temp_max);
        // Short weather description
        const weather_description =
          json_data.list[i].weather[0].description;
        // Gets the logos name and URL to the logo .png file
        const logo_name = json_data.list[i].weather[0].icon + ".png";
        const logo_url =
          " http://openweathermap.org/img/wn/" + logo_name;
        console.log(logo_url);
      }
    });
};

export { test_api, get_api_key };

const get_random_city = () => {
  const cities = [
    "New York",
    "London",
    "Berlin",
    "Amsterdam",
    "Marrakesh",
    "Paris",
    "Venezia",
    "Warsaw",
  ];
  return cities[Math.floor(Math.random() * cities.length)];
};

const get_api_key = () => "58870e7945eeb6b9b2d5e086112bce8c";

// Hourly

// https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city_name}?lat={lat}&lon={lon}&appid=${key}&units=metric

const test_api = (city_name, key) => {
  fetch(
    ` https://api.openweathermap.org/data/2.5/weather?q=${city_name}&lat=35&lon=139&appid=${key}&units=metric`
  )
    .then(function (data) {
      if (data.ok) {
        return data.json();
      }
      throw new Error("City does not exist");
    })
    .then(function (json_data) {
      console.log(json_data);

      // Testing weather icon

      const icon_name = json_data.weather[0].icon;
      const icon_test = document.getElementById("icon-test");
      console.log(icon_test);
      icon_test.src = `http://openweathermap.org/img/wn/${icon_name}@2x.png`;
    });
};

export { test_api, get_api_key, get_random_city };

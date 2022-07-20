const get_api_key = () => "58870e7945eeb6b9b2d5e086112bce8c";

const test_api = (key) => {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${key}`
  )
    .then((data) => data.json())
    .then((json_data) => console.log(json_data));
};

export { test_api, get_api_key };

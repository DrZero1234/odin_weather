function get_day_name(index) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[index];
}

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

export { get_day_name, get_random_city };

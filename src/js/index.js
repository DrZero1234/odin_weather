import "../css/style.css";
import { get_api_key, test_api } from "./API_functions";
import { get_random_city } from "./Other_functions";

const search_bar = document.getElementById("search-text");
const search_form = document.getElementById("search-btn");

// Adding the event for both Button and enter press

search_bar.addEventListener("keypress", () => {
  if (event.key === "Enter") {
    test_api(search_bar.value, get_api_key());
  }
});

search_form.addEventListener("click", () => {
  test_api(search_bar.value, get_api_key());
});

test_api(get_random_city(), get_api_key());

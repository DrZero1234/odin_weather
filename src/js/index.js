import "../css/style.css";
import {
  get_api_key,
  test_api,
  get_random_city,
} from "./API_functions";

const search_bar = document.getElementById("search-text");
const search_btn = document.getElementById("search-btn");

console.log(search_btn);

search_btn.addEventListener("click", () => {
  test_api(search_bar.value, get_api_key());
});

test_api(get_random_city(), get_api_key());

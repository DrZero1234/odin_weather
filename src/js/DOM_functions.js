function display_weather_cards(weather_data_dict) {}

function clear_section(dom_elem) {
  while (dom_elem.firstChild) {
    dom_elem.removeChild(dom_elem.firstChild);
  }
}

export { clear_section };

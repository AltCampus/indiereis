export function Country(state = [], action) {
  switch (action.type) {
    case "SHOW_SCRAPPED_COUNTRIES":
      return {
        ...state,
        data: action.data,
      };

    case "DISCOVER_COUNTRY_NAME":
      return {
        ...state,
        country: action.payload,
      };

    case "FILTERED_COUNTRIES":
      return {
        ...state,
        filteredCountry: action.data,
      };

    case "SHOW_COUNTRY":
      return {
        ...state,
        countryName: action.data,
      };

    default:
      return state;
  }
}

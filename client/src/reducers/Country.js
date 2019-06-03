export function Country(state =[], action) {
	switch (action.type) {
		case "SHOW_SCRAPPED_COUNTRIES":
			return {
				...state,
				data: action.data,
			};
		case 'DISCOVER_COUNTRY_NAME':
			return {
				...state,
				country: action.payload,
			};
		default: {
			return state
		}
	}
}

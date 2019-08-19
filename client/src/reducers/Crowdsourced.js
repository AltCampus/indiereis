export function Crowdsourced(state =[], action) {
	switch (action.type) {
		case "SHOW_FORM_DATA":
			return {
				...state,
				data: action.formData,
			};
		case 'COUNTRY_NAME':
			return null
			return {
				...state,
				country: action.countryName
			};
		default: {
			return state
		}
	}
}

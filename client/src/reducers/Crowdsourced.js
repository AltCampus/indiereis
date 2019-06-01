export function Crowdsourced(state =[], action) {
	console.log(state, action, "red..")
	switch (action.type) {
		case "SHOW_FORM_DATA":
			return {
				...state,
				data: action.formData,
			};
		case 'COUNTRY_NAME':
			return {
				...state,
				country: action.countryName
			};
		default: {
			return state
		}
	}
}

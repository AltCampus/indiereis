export function Crowdsourced(state =[], action) {
	switch (action.type) {
		case "SHOW_FORM_DATA":
			return {
				...state,
				data: action.formData,
			};
		default: {
			return state
		}
	}
}

export function Country(state =[], action) {
	switch (action.type) {
		case "SHOW_SCRAPPED_COUNTRIES":
			return {
				...state,
				data: action.data,
			};
		default: {
			return state
		}
	}
}

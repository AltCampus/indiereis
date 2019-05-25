
export default function Questions(state = [], action) {
	console.log(state, action)
	switch (action.type) {
		case "ADD_QUESTIONS":
		return {
			...state,
			data: action.data,
		};
		case "SET_COUNTRY":
		return {
			...state,
			country: action.data,
		}
		default: {
			return state
		}
	}
}



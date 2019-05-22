export default function User(state = [], action) {
	switch (action.type) {
		case "REGISTER":
			return {
				...state,
				user: action.user
			};
			default: {
				return state
			}
	}
}


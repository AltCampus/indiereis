export default function User(state = [], action) {
	switch (action.type) {
		case "REGISTER":
		return {
			...state,
			user: action.user
		};
		case 'LOGIN':
		return {
			...state,
			user: action.user
		};
		case 'LOGOUT':
		return {
			...state,
			user: null
		}
			default: {
				return state
			}
	}
}


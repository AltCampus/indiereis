export function Questions(state = [], action) {
	// console.log(state, action, 'inside reducer');
	switch (action.type) {
		case "ADD_QUESTIONS":
		return {
			...state,
			data: action.data,
		};
		case "ADD_USER_DATA":
			state.push(action.data)
		return {
			...state,
		};
		default: {
			return state
		}
	}
}

export function userFormData(state = [], action) {
	// console.log(state, action, 'inside reducer');
	switch (action.type) {
		case "ADD_COUNTRY" :
		return {
			...state,
			countaryAndTrip: action.data,
		};
		case "ADD_FORM1" :
		return {
			...state,
			form1: action.data,
		};
		case "ADD_FORM2" :
		return {
			...state,
			form2: action.data,
		};
		case "ADD_FORM3" :
		return {
			...state,
			form3: action.data,
		};
		case "ADD_FORM4" :
		return {
			...state,
			form4: action.data,
		};
		case "ADD_FORM5" :
		return {
			...state,
			form5: action.data,
		};
		case "ADD_FORM6" :
		return {
			...state,
			form6: action.data,
		};
		default: {
			return state
		}
	}
}



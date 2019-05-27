import { createStore, combineReducers } from 'redux';
import User  from './reducers/User';
import { Questions, userFormData } from './reducers/Questions';

const rootReducer = combineReducers({
	User,
	Questions,
	userFormData,
})

export const store = createStore(rootReducer);

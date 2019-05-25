import { createStore, combineReducers } from 'redux';
import User  from './reducers/User';
import Questions from './reducers/Questions';

const rootReducer = combineReducers({
	User,
	Questions,
})

export const store = createStore(rootReducer);

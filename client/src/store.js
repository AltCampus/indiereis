import { createStore, combineReducers } from 'redux';
import User  from './reducers/User';
import { Questions, userFormData } from './reducers/Questions';
import {Crowdsourced} from './reducers/Crowdsourced';


const rootReducer = combineReducers({
	User,
	Questions,
	userFormData,
	Crowdsourced,
})

export const store = createStore(rootReducer);

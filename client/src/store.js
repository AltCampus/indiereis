import { createStore, combineReducers } from 'redux';
import User  from './reducers/User';
import { Questions, userFormData } from './reducers/Questions';
import {Crowdsourced} from './reducers/Crowdsourced';
import {Country} from './reducers/Country';


const rootReducer = combineReducers({
	User,
	Questions,
	userFormData,
	Crowdsourced,
	Country
})

export const store = createStore(rootReducer);

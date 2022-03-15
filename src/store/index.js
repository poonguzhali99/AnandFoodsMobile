import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as network } from 'react-native-offline';
import { authReducer } from '../services/auth/reducer';
import { userDetailsReducer } from '../services/user-details/reducer';

const appReducer = combineReducers({
	network,
	authReducer,
	userDetailsReducer
});

const rootReducer = (state, action) => {
	if (action.type === 'CLEAR_DATA') {
		state = undefined;
	}
	return appReducer(state, action);
};

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;

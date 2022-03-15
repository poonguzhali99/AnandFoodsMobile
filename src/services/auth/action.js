import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../store';
import * as types from './action-types';

export const logIn = () => {
	return (dispatch) => {
		AsyncStorage.getItem('session').then((data) => {
			var session = data;
			dispatch({
				type: types.LOG_IN,
				payload: session
			});
		});
	};
};
export const logOut = () => {
	return (dispatch) => {
		AsyncStorage.clear().then(() => {
			store.dispatch({ type: 'CLEAR_DATA' });
			dispatch({
				type: types.LOG_OUT
			});
		});
	};
};

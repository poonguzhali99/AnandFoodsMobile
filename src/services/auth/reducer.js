import * as types from './action-types';

export const authReducer = (
	state = {
		isLoggedIn: false,
		userToken: null
	},
	{ type, payload }
) => {
	switch (type) {
		case types.RESTORE_TOKEN:
			return {
				...state,
				userToken: payload,
				isLoggedIn: true
			};
		case types.LOG_IN:
			return {
				...state,
				isLoggedIn: true,
				userToken: payload
			};
		case types.LOG_OUT:
			return {
				...state,
				isLoggedIn: false,
				userToken: null
			};
		default:
			return state;
	}
};

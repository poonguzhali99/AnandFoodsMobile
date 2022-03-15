import axios from 'axios';
import { API_URL } from '../utils/config';
// import './axios-auth-refresh-token';
export const ROOT_URL = API_URL;
import store from '../store';
import { logOut } from './auth/action';

const API_CALL = ({
	method,
	url,
	fullUrl,
	data,
	params,
	type,
	callback,
	headerConfig,
	errCallback,
	file,
	onUploadProgress,
	cancelToken
}) => {
	let header;
	// To change the header configuration - specific
	headerConfig ? (header = { ...header, ...headerConfig }) : (header = header);
	if (callback) {
		axios({
			method,
			url: fullUrl ? fullUrl : ROOT_URL + url,
			data,
			params: params,
			headers: header,
			validateStatus: (status) => {
				if (status == 503) {
					store.dispatch(logOut());
				}
				if (status == 401) return false;
				else return true; // I'm always returning true, you may want to do it depending on the status received
			},
			responseType: file ? 'arraybuffer' : 'json',
			onUploadProgress: ({ loaded, total }) => {
				let percent = Math.floor(loaded * 100 / total);
				return onUploadProgress ? onUploadProgress(percent) : false;
				// Do whatever you want with the native progress event
			},
			cancelToken
		}).then((data) => {
			console.log(fullUrl ? fullUrl : url, 'Data: ', data);
			return callback(data);
		});
	} else {
		return (dispatch) => {
			dispatch({
				type: type.REQ
			});
			axios({
				method,
				url: ROOT_URL + url,
				data,
				params,
				headers: header,
				validateStatus: (status) => {
					if (status == 503) {
						store.dispatch(logOut());
					}
					if (store.getState().authReducer && status == 401) return false;
					else return true; // I'm always returning true, you may want to do it depending on the status received
				}
			})
				.then((response) => {
					console.log(url, 'Response: ', response);
					dispatch({
						type: type.RES,
						payload: response
					});
				})
				.catch((error) => {
					dispatch({
						type: type.FAIL,
						payload: error
					});
				});
		};
	}
};

export default API_CALL;

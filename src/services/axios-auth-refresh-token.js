import axios from 'axios';
import { appSpecifics } from '../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { killSession } from './common-actions';

let isRefreshing = false;
let refreshSubscribers = [];
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const { API_URL, APP_ID } = appSpecifics;
		const { config, response: { status } } = error;
		const originalRequest = config;
		const session = await AsyncStorage.getItem('session');
		const refresh_token = JSON.parse(session).refresh_token;
		if (status === 401) {
			if (!isRefreshing) {
				isRefreshing = true;
				axios({
					method: 'post',
					url: API_URL + 'login/refresh',
					data: {
						refreshToken: refresh_token
					},
					headers: {
						'Content-Type': 'application/json',
						'md-app-id': APP_ID
					},
					validateStatus: () => true
				}).then(async ({ status, data }) => {
					if (status == 200) {
						isRefreshing = false;
						onRrefreshed(data);
						await AsyncStorage.setItem('session', JSON.stringify(data));
						refreshSubscribers = [];
					} else {
						refreshSubscribers = [];
						// killSession();
					}
				});
			}

			const retryOriginalRequest = new Promise((resolve, reject) => {
				subscribeTokenRefresh(({ access_token, token_type }) => {
					// replace the expired token and retry
					originalRequest.headers['Authorization'] = `${token_type} ${access_token}`;
					resolve(axios(originalRequest));
				});
			});
			return retryOriginalRequest;
		} else {
			refreshSubscribers = [];
			// killSession();
		}
		return Promise.reject(error.response);
	}
);

const subscribeTokenRefresh = (cb) => {
	refreshSubscribers.push(cb);
};

const onRrefreshed = (data) => {
	refreshSubscribers.map((cb) => cb(data));
	refreshSubscribers = [];
};

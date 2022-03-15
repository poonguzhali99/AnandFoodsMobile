import React from 'react';
import { Provider } from 'react-redux';
import { NetworkProvider, ReduxNetworkProvider } from 'react-native-offline';
import App from './src/app';
import store from './src/store';

const Main = () => {
	return (
		<Provider store={store}>
			<NetworkProvider>
				<ReduxNetworkProvider>
					<App />
				</ReduxNetworkProvider>
			</NetworkProvider>
		</Provider>
	);
};

export default Main;

import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, View, AppState, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { useIsConnected } from 'react-native-offline';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Pages
import Login from './pages/public/Login';
import Welcome from './pages/public/Welcome';
import Dashboard from './pages/protected/Dashboard';
import Forms from './pages/protected/Dashboard/Forms';
import DrawerContent from './pages/protected/Drawer';
import MyStatusBar from './components/common-components/MyStatusBar';

// Redux calls
import { logIn, logOut } from './services/auth/action';
import { getUserDetails } from './services/user-details/action';

// navigation service
import { navigationRef, isReadyRef } from './utils/RootNavigation';
import { client_info, colors } from './utils/config';
import NetworkError from './components/common-components/NetworkError';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
	const { authReducer: { isLoggedIn, isLoggedOut, userToken } } = useSelector(({ authReducer }) => {
			return {
				authReducer
				// errorStatus: errorReducer.response
			};
		}, shallowEqual),
		dispatch = useDispatch();

	// const netInfo = useNetInfo();
	const [ loader, setLoader ] = useState(true),
		[ isOffline, setOfflineStatus ] = useState(false);

	const isConnected = useIsConnected();

	useEffect(
		() => {
			console.log('isConnected', isConnected);
			isConnected != null && setOfflineStatus(!isConnected);
		},
		[ isConnected ]
	);
	useEffect(() => {
		// BackHandler.addEventListener('hardwareBackPress', backPressed);
		// const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
		// 	const offline = !(state.isConnected && state.isInternetReachable);
		// 	console.log('offline', offline);
		// 	setOfflineStatus(offline);
		// });
		_bootstrapFlow();
		return () => {
			// BackHandler.removeEventListener('hardwareBackPress', backPressed);
			// removeNetInfoSubscription();
			isReadyRef.current = false;
		};
	}, []);

	// useEffect(() => {
	// 	console.log("errorStatus", errorStatus);
	// 	// if (errorStatus) {
	// 	// 	return (
	// 	// 		<NetworkError
	// 	// 			show={errorStatus}
	// 	// 			title="Service Unavailable"
	// 	// 			message="Oops! Looks like Service is Temporarily Unavailable."
	// 	// 			btnTitle="Retrying to Connect..." />
	// 	// 	);
	// 	// }
	// }, [errorStatus])

	const _bootstrapFlow = async () => {
		await AsyncStorage.setItem('activity', JSON.stringify(0));
		const userToken = await AsyncStorage.getItem('session');
		console.log('userToken', userToken);
		let userDetailsObj = await AsyncStorage.getItem('userDetails');
		console.log('User Details: ', JSON.parse(userDetailsObj));
		let userDetailsObject = JSON.parse(userDetailsObj);
		dispatch(getUserDetails(userDetailsObject));
		// SplashScreen.hide();
		if (userToken) {
			dispatch(logIn());
			setTimeout(() => {
				setLoader(false);
			}, 1000);
		} else {
			setLoader(false);
		}
	};

	const backPressed = () => {
		Alert.alert(
			'Exit App',
			'Do you want to exit?',
			[
				{ text: 'No', onPress: () => {}, style: 'cancel' },
				{ text: 'Yes', onPress: () => BackHandler.exitApp() }
			],
			{ cancelable: false }
		);
		return true;
	};

	const HomeStackScreen = () => {
		return (
			<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
				{/* // <Stack.Navigator initialRouteName="Dashboard"> */}
				<Stack.Screen name="Dashboard" component={Dashboard} />
				<Stack.Screen name="Forms" component={Forms} />
			</Stack.Navigator>
		);
	};

	const renderRoutes = () => {
		return (
			<NavigationContainer
				ref={navigationRef}
				onReady={() => {
					isReadyRef.current = true;
				}}
			>
				{/* <NetworkError
					show={isOffline}
					title="Connection Error"
					message="Oops! Looks like your device is not connected to the Internet."
					btnTitle="Retrying to Connect..."
				/> */}
				{isLoggedIn ? (
					<View style={{ flex: 1 }}>
						{/* <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" /> */}
						{/* <Drawer.Navigator
							drawerContent={(props) => <DrawerContent {...props} />}
							drawerPosition="left"
							// initialRouteName="NotificationGroups"
						> */}
						{/* <Drawer.Screen
								name="Dashboard"
								component={HomeStackScreen}
								// options={{
								// 	headerShown: false
								// }}
							/> */}
						{/* <Drawer.Navigator initialRouteName="Dashboard">
							<Drawer.Screen name="Dashboard" component={Dashboard} />
							<Drawer.Screen name="Forms" component={Forms} />
							<Drawer.Screen name="Log Out" component={() => dispatch(logOut())} />
						</Drawer.Navigator> */}
						<Stack.Navigator>
							<Stack.Screen
								name="Dashboard"
								component={Dashboard}
								options={{
									headerRight: () => (
										<TouchableOpacity onPress={() => dispatch(logOut())}>
											<FontAwesome
												name="sign-out"
												color={colors.darkGrey}
												size={25}
												style={{ marginRight: 5 }}
											/>
										</TouchableOpacity>
									)
								}}
							/>
							<Stack.Screen name="Forms" component={Forms} />
						</Stack.Navigator>
					</View>
				) : (
					<Stack.Navigator>
						<Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
						<Stack.Screen name="Login" component={Login} />
					</Stack.Navigator>
				)}
			</NavigationContainer>
		);
	};
	return <View style={{ flex: 1 }}>{loader && isLoggedIn ? null : renderRoutes()}</View>;
	// return <View style={{ flex: 1 }}>{renderRoutes()}</View>;
};

export default App;

import React from 'react';
import { View, TouchableOpacity, ToastAndroid, Alert, Platform } from 'react-native';
import CustomText from '../components/CustomText';

export const toast = (message, title, type) => {
	// if (Platform.OS == 'android')
	// 	return (type == 'ios' || type == null) && ToastAndroid.show(message, ToastAndroid.LONG);
	// else if (Platform.OS == 'ios')
	// return (type == 'android' || type == null) && Alert.alert(title, message, [ { text: 'OK', onPress: () => {} } ]);
	return Alert.alert('St.Andrews School', `   ${message}`, [ { text: 'OK', onPress: () => {} } ]);
};

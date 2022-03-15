import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, Alert, SafeAreaView } from 'react-native';
import { colors } from '../../../utils/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomText from '../../../components/CustomText/index';
import MyStatusBar from '../../../components/common-components/MyStatusBar';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { logOut } from '../../../services/auth/action';
import { Styles } from './style';

const DrawerContent = ({ navigation }) => {
	const { authReducer: { userToken } } = useSelector(({ authReducer }) => {
			return {
				authReducer
			};
		}, shallowEqual),
		dispatch = useDispatch();

	const renderSeparator = () => <View style={Styles.line} />;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 0.94, paddingLeft: 10 }}>
				<TouchableOpacity
					style={Styles.menuItem}
					onPress={() => {
						navigation.navigate('Dashboard');
					}}
				>
					<CustomText medium>Home</CustomText>
				</TouchableOpacity>
				<TouchableOpacity
					style={Styles.menuItem}
					onPress={() => {
						navigation.navigate('Forms');
					}}
				>
					<CustomText medium>Forms</CustomText>
				</TouchableOpacity>
				<TouchableOpacity
					style={Styles.menuItem}
					onPress={() => {
						dispatch(logOut());
					}}
				>
					<CustomText medium>Log out</CustomText>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default DrawerContent;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { colors, images } from '../../utils/config';
import CustomText from '../CustomText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { setActiveAcademicYear } from '../../services/student-master/action';
import { logOut } from '../../services/auth/action';
import { Formik } from 'formik';
import FormField from '../form-field';

function NavHeader(props) {
	const { container, menuIcon, imageStyle, profileIcon, leftIcon } = Styles;
	const { left = true, title, right = false, config, academicDropDown = true } = props;
	const {
			userProfile,
			academicYearList,
			activeBranch
		} = useSelector(({ userDetailsReducer, userProfileReducer, academicYearReducer, branchReducer }) => {
			return {
				userDetails: userDetailsReducer.response,
				userProfile: userProfileReducer.response,
				academicYearList: academicYearReducer.response.availableAcademicYear,
				activeBranch: branchReducer.response.activeBranch
			};
		}, shallowEqual),
		dispatch = useDispatch();

	return (
		<View>
			{activeBranch &&
			activeBranch.name && (
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: colors.primary
					}}
				>
					<View style={{ flexDirection: 'row', width: '96%', justifyContent: 'center' }}>
						<CustomText white bold style={{ textAlign: 'center' }}>
							{activeBranch.name}
							{', '}
						</CustomText>
						<CustomText bold white style={{ textAlign: 'center' }}>
							{activeBranch.location}
						</CustomText>
					</View>
				</View>
			)}

			<View style={container}>
				{left ? (
					<TouchableOpacity style={leftIcon} onPress={() => props.navigation.goBack()}>
						<FontAwesome name="chevron-left" color={colors.white} size={20} />
					</TouchableOpacity>
				) : (
					<View style={{ padding: 5 }}>
						<TouchableOpacity style={profileIcon} onPress={() => props.navigation.toggleDrawer()}>
							{userProfile && userProfile.ImageUrl ? (
								<Image source={{ uri: userProfile.ImageUrl }} style={imageStyle} />
							) : (
								<Image source={require('../../assets/images/student-avatar.png')} style={imageStyle} />
							)}
							<View style={menuIcon}>
								<Entypo name="menu" color={colors.primary} size={15} />
							</View>
						</TouchableOpacity>
					</View>
				)}
				<View
					style={{
						backgroundColor: colors.primary,
						justifyContent: 'center',
						alignItems: 'center',
						width: '70%'
					}}
				>
					<CustomText white bold large>
						{title}
					</CustomText>
				</View>

				{right ? (
					<TouchableOpacity
						style={{ width: '8%', alignItems: 'flex-end', margin: 5 }}
						onPress={() => props.navigation.navigate('NotificationGroups')}
					>
						{/* <View
							style={{
								backgroundColor: colors.danger,
								height: 12,
								width: 12,
								borderRadius: 20,
								position: 'absolute',
								top: 0,
								right: 0
							}}
						/> */}
						<FontAwesome name={'bell-o'} color={colors.white} size={25} />
					</TouchableOpacity>
				) : (
					<View style={{ width: '8%', alignItems: 'flex-end' }} />
				)}
			</View>
			{academicDropDown &&
			Array.isArray(academicYearList) &&
			academicYearList.length > 0 && (
				<Formik initialValues={{ AdminAdmyear: academicYearList[0].U_VALUS }}>
					<View
						style={{
							paddingHorizontal: 10,
							paddingTop: 10,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						<CustomText muted bold>
							Welcome {userProfile && userProfile.FirstName},
						</CustomText>
						<FormField
							name="AdminAdmyear"
							type="modal"
							placeholder="Academic Year"
							data={academicYearList}
							keyword="U_VALUS"
							label="U_Desc"
							handleOnChange={(year) => {
								dispatch(setActiveAcademicYear(year));
							}}
						/>
					</View>
				</Formik>
			)}
		</View>
	);
}

export { NavHeader };

const Styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%'
		// paddingHorizontal: 10,
		// paddingBottom: 10
	},
	menuIcon: {
		position: 'absolute',
		bottom: -2,
		right: -6,
		backgroundColor: colors.imagePlaceHolder,
		borderWidth: 1,
		borderColor: colors.grey,
		borderRadius: 30,
		height: 20,
		width: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	imageStyle: {
		width: 45,
		height: 45,
		borderRadius: 40
	},
	profileIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40,
		borderWidth: 1,
		borderColor: colors.grey
	},
	leftIcon: {
		width: '8%',

		height: 60,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

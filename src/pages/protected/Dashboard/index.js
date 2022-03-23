import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomText from '../../../components/CustomText';

import API_CALL from '../../../services';
import { colors, viewportWidth } from '../../../utils/config';
import { logOut } from '../../../services/auth/action';
import moment from 'moment';
import { toast } from '../../../utils/common-actions';

const Dashboard = ({ navigation }) => {
	const [ checkList, setCheckList ] = useState([]),
		[ listToady, setListToday ] = useState([]);

	const {
			authReducer: { isLoggedIn, isLoggedOut, userToken },
			userDetails
		} = useSelector(({ authReducer, userDetailsReducer }) => {
			return {
				authReducer,
				userDetails: userDetailsReducer.response
			};
		}, shallowEqual),
		dispatch = useDispatch();

	useEffect(
		() => {
			API_CALL({
				method: 'get',
				url: 'CheckList',
				// data: values,
				callback: async ({ status, data }) => {
					if (status == 200) setCheckList(data);
				}
			});
			API_CALL({
				method: 'get',
				url: 'GetByDateLabChemist',
				params: { date: moment().format('DD/MM/YYYY') },
				callback: async ({ status, data }) => {
					if (status == 200) setListToday(data);
				}
			});
		},
		[ userDetails ]
	);
	const RenderCard = ({ count, title, colorValue }) => (
		<View
			style={{
				backgroundColor: colors.white,
				alignItems: 'center',
				justifyContent: 'center',
				padding: 15,
				width: viewportWidth * 0.29,
				borderRadius: 8
			}}
		>
			<CustomText bold style={{ marginBottom: 10, color: colorValue, fontSize: 30 }}>
				{count}
			</CustomText>
			<CustomText bold color={colorValue}>
				{title}
			</CustomText>
		</View>
	);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.appBackground }}>
			<View style={{ padding: 10 }}>
				<CustomText large bold muted>
					CheckLists
				</CustomText>
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
				<RenderCard count="30" title="Total" colorValue={colors.primary} />
				<RenderCard count="6" title="Assigned" colorValue={colors.warning} />
				<RenderCard count="1" title="Completed" colorValue={colors.success} />
			</View>

			<View style={{ padding: 10 }}>
				<CustomText large bold muted>
					Inspections
				</CustomText>
			</View>

			<FlatList
				data={checkList}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={{
							backgroundColor: colors.white,
							borderRadius: 8,
							marginVertical: 5,
							marginHorizontal: 10,
							padding: 15
						}}
						onPress={() => {
							if (item.ref_name == 1 && listToady.length >= 4) {
								toast('You have completed your day count');
							} else {
								item.ref_name == 1 && navigation.navigate('Forms');
							}
						}}
					>
						<View style={{ flexDirection: 'row' }}>
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: colors.imagePlaceHolder,
									width: 55,
									height: 55,
									borderRadius: 50
								}}
							>
								<CustomText bold large primary>
									{(item.name && item.name.split(' ')[0][0]) + item.name.split(' ')[1][0]}
								</CustomText>
							</View>

							<View style={{ marginLeft: 15 }}>
								<CustomText medium bold>
									{item.name}
								</CustomText>
								<CustomText small muted>
									No Description
								</CustomText>
								<CustomText muted small>
									Author: {userDetails.firstName} {userDetails.lastName} ({item.userRole})
								</CustomText>
							</View>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-start',
								// marginTop: 10,
								width: viewportWidth * 0.8
							}}
						>
							{item.ref_name == 1 && (
								<FlatList
									data={listToady}
									keyExtractor={(item) => item.id}
									showsVerticalScrollIndicator={false}
									horizontal={false}
									numColumns={4}
									renderItem={({ item, index }) => (
										<TouchableOpacity
											style={{
												backgroundColor: '#d6f5d6',
												borderColor: '#248f24',
												flexDirection: 'row',
												borderWidth: 1,
												padding: 5,
												margin: 5,
												borderRadius: 3
											}}
											onPress={() =>
												toast(`Updated on ${moment(item.createddate).format('LLL')}`)}
										>
											<FontAwesome
												name="check"
												color={'#248f24'}
												size={15}
												style={{ marginRight: 5 }}
											/>
											<CustomText small bold>
												Shift {index + 1}
											</CustomText>
										</TouchableOpacity>
									)}
								/>
							)}
						</View>
					</TouchableOpacity>
				)}
			/>
			{/* <CustomText>Welcome</CustomText> */}
		</SafeAreaView>
	);
};

export default Dashboard;

import { Formik } from 'formik';
import React, { useState } from 'react';
import {
	View,
	Image,
	SafeAreaView,
	KeyboardAvoidingView,
	FlatList,
	ScrollView,
	TouchableOpacity,
	TextInput
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import { commonStyles } from '../../../components/common-styles/Styles';
import CustomText from '../../../components/CustomText';
import Empty from '../../../components/empty';
import FormField from '../../../components/form-field';
import { colors, viewportHeight, viewportWidth } from '../../../utils/config';
import { labReport } from '../../../utils/sampleJSON';
import API_CALL from '../../../services';
import Loader from '../../../components/Loader';

const Forms = ({ navigation, route }) => {
	const [ noteVisible, setNoteVisible ] = useState(false),
		[ loader, setLoader ] = useState(false);
	let initval = {};
	labReport.map(({ refference_name }) => {
		initval[refference_name] = '';
	});
	console.log('initval', initval);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
			<Loader show={loader} />
			{/* <Empty /> */}
			<KeyboardAvoidingView style={{ padding: 10 }}>
				{/* <CustomText bold medium underline>
					Daily Laboratory Report
				</CustomText> */}
				{/* <View style={{ height: viewportHeight * 0.75 }}> */}
				<Formik
					initialValues={initval}
					validate={(values) => {
						let errors = {};
						for (const [ key, value ] of Object.entries(values)) {
							// console.log(`${key}: ${value}`);
							if (!value) errors[key] = 'Required';
						}
						// for (let val of values) {
						// 	if (!val[refference_name]) errors[refference_name] = 'Required';
						// }
						console.log('Errors', errors);
						return errors;
					}}
					onSubmit={(values) => {
						console.log(values);
						let payload = Object.assign({}, values);
						// payload.ref_name = 0;
						setLoader(true);
						API_CALL({
							method: 'post',
							url: 'AddLabChemist',
							data: payload,
							callback: async ({ status, data }) => {
								setLoader(false);
								// if (status == 200) setCheckList(data);
							}
						});
					}}
				>
					{({ values, handleSubmit }) => (
						<FlatList
							data={labReport}
							keyExtractor={(item) => item.refference_name}
							showsVerticalScrollIndicator={false}
							ListFooterComponent={
								<TouchableOpacity
									style={[ commonStyles.btnPrimary, { marginVertical: 10, paddingVertical: 15 } ]}
									onPress={handleSubmit}
								>
									<CustomText white>Complete Inspection</CustomText>
								</TouchableOpacity>
							}
							renderItem={({ item }) => {
								return (
									<View
										style={{
											// justifyContent: 'space-between',
											// alignItems: 'center',
											padding: 15,
											borderRadius: 8,
											borderWidth: 1,
											marginVertical: 10,
											borderColor: colors.placeHolderGrey
										}}
									>
										<CustomText bold>{item.name}</CustomText>
										{/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
										
											<FormField /> */}
										{/* </View> */}

										<FormField
											type="text-area"
											name={item.refference_name}
											placeholder={item.units}
										/>
										<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
											<TouchableOpacity
											// onPress={() => setNoteVisible(true)}
											>
												<CustomText small muted>
													Add note...
												</CustomText>
											</TouchableOpacity>
											<Modal
												isVisible={noteVisible}
												animationIn="slideInUp"
												animationOut="slideOutDown"
												onBackdropPress={() => setNoteVisible(false)}
											>
												<View style={{ flex: 1, justifyContent: 'flex-end' }}>
													<View
														style={{
															backgroundColor: colors.white,
															minHeight: viewportHeight * 0.4,
															maxHeight: viewportHeight * 0.7
														}}
													>
														<View
															style={{
																flexDirection: 'row',
																justifyContent: 'space-between',
																alignItems: 'center',
																// margin: 10,
																padding: 10
															}}
														>
															<View
																style={{ flexDirection: 'row', alignItems: 'center' }}
															>
																<TouchableOpacity
																	onPress={() => setNoteVisible(!noteVisible)}
																>
																	<AntDesign
																		name="close"
																		color={colors.darkGrey}
																		size={22}
																		style={{ marginRight: 5 }}
																	/>
																</TouchableOpacity>

																<CustomText bold>Note</CustomText>
															</View>

															<Feather
																name="check"
																color={colors.darkGrey}
																size={22}
																style={{ marginRight: 5 }}
															/>
														</View>
														<TextInput
															placeholder="Add a note..."
															style={{ paddingLeft: 10 }}
														/>
													</View>
												</View>
											</Modal>
											<View style={{ flexDirection: 'row', alignItems: 'center' }}>
												<TouchableOpacity
													style={{ flexDirection: 'row', alignItems: 'center' }}
												>
													<FontAwesome
														name="file-image-o" //check-square-o
														color={colors.darkGrey}
														size={15}
														style={{ marginRight: 5 }}
													/>
													<CustomText small muted>
														Media
													</CustomText>
												</TouchableOpacity>
												<TouchableOpacity
													style={{
														flexDirection: 'row',
														alignItems: 'center',
														marginLeft: 10
													}}
												>
													<FontAwesome
														name="check-square-o"
														color={colors.darkGrey}
														size={15}
														style={{ marginRight: 5 }}
													/>
													<CustomText small muted>
														Action
													</CustomText>
												</TouchableOpacity>
											</View>
										</View>
									</View>
								);
							}}
						/>
					)}
				</Formik>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Forms;

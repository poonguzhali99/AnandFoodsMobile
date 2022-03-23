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
import { toast } from '../../../utils/common-actions';

const Forms = ({ navigation, route }) => {
	const [ noteVisible, setNoteVisible ] = useState(false),
		[ labReportChecklist, setlabReportChecklist ] = useState(labReport),
		[ loader, setLoader ] = useState(false);
	let initval = {};
	labReport.map((report) => {
		initval[report.refference_name] = '';
		report.noteVisible = false;
	});
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
			<Loader show={loader} />
			{/* <TouchableOpacity onPress={() => setNoteVisible(!noteVisible)}>
				<CustomText>Press</CustomText>
			</TouchableOpacity> */}
			<KeyboardAvoidingView style={{ padding: 10 }}>
				<Formik
					initialValues={initval}
					validate={(values) => {
						let errors = {};
						for (const [ key, value ] of Object.entries(values)) {
							if (!value) errors[key] = 'Required';
						}
						return errors;
					}}
					onSubmit={(values) => {
						console.log(values);
						let payload = Object.assign({}, values);
						setLoader(true);
						API_CALL({
							method: 'post',
							url: 'AddLabChemist',
							data: payload,
							callback: async ({ status, data }) => {
								if (status == 200) {
									setLoader(false);
									if (data.SuccessCode) {
										toast(data.SuccessMessage);
										navigation.navigate('Dashboard');
									} else toast(data.ErrorMeaaage);
								}
							}
						});
					}}
				>
					{({ values, handleSubmit }) => (
						<FlatList
							data={labReportChecklist}
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
											padding: 15,
											borderRadius: 8,
											borderWidth: 1,
											marginVertical: 10,
											borderColor: colors.placeHolderGrey
										}}
									>
										<CustomText bold>{item.name}</CustomText>
										<CustomText muted bold style={{ marginTop: 5 }}>
											[ {item.standardValue} ]
										</CustomText>
										<FormField
											type="text-area"
											name={item.refference_name}
											placeholder={item.units}
										/>
										<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
											<TouchableOpacity
												onPress={() => {
													labReportChecklist.map((report) => {
														if (report.refference_name == item.refference_name) {
															report.noteVisible = true;
														} else report.noteVisible = false;
														// return report;
													});
													// console.log('labReportChecklist', labReportChecklist);
													setlabReportChecklist(labReportChecklist);
												}}
											>
												<CustomText small muted>
													Add note...
												</CustomText>
											</TouchableOpacity>
											{/* {console.log(
												'Welcome',
												labReportChecklist,
												labReportChecklist.filter(
													(check) => check.refference_name == item.refference_name
												)[0].noteVisible
											)} */}
											<Modal
												isVisible={
													labReportChecklist.filter(
														(check) => check.refference_name == item.refference_name
													)[0].noteVisible
												}
												// isVisible={noteVisible}
												animationIn="slideInUp"
												animationOut="slideOutDown"
												// onBackdropPress={() => setNoteVisible(false)}
											>
												<View
													style={{
														flex: 1,
														justifyContent: 'flex-end',
														backgroundColor: colors.translucent
													}}
												>
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
																// onPress={() => setNoteVisible(!noteVisible)}
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

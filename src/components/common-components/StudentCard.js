import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import FormField from '../form-field';
import { colors } from '../../utils/config';
import CustomText from '../CustomText';
import { getStudentMasterList, getStudentInfoById, setActiveBranch } from '../../services/student-master/action';
import Empty from '../empty';

const StudentCard = () => {
	const {
			userDetails,
			authReducer: { userToken },
			studentList,
			studentInfo
		} = useSelector(({ authReducer, userDetailsReducer, studentMasterRreducer, studentInfoReducer }) => {
			return {
				authReducer,
				userDetails: userDetailsReducer.response,
				studentList: studentMasterRreducer.response,
				studentInfo: studentInfoReducer.response
			};
		}),
		dispatch = useDispatch();

	useEffect(() => {
		let params = {
			EmailId: userToken
		};
		dispatch(getStudentMasterList(userDetails.Userrole, params));
	}, []);

	useEffect(
		() => {
			dispatch(setActiveBranch(studentInfo.SchoolName));
		},
		[ studentInfo ]
	);

	let { StudentFirstName, StudentLastName, CardCode, AdmissionClass, Section } = studentInfo;
	return (
		<View style={Styles.container}>
			{Object.keys(studentInfo).length > 0 ? (
				<Formik
					initialValues={{
						selectStudentID:
							studentInfo && studentInfo.CardCode ? studentInfo.CardCode : studentList[0].U_VALUS
					}}
				>
					<View>
						<View style={Styles.cardHeader}>
							<CustomText white bold>
								Student Details
							</CustomText>
							{studentList &&
							Array.isArray(studentList) &&
							studentList.length > 0 && (
								<FormField
									name="selectStudentID"
									type="modal"
									placeholder="Student"
									data={studentList}
									keyword="U_VALUS"
									label="U_Desc"
									handleOnChange={(id) => {
										dispatch(getStudentInfoById(id));
									}}
								/>
							)}
						</View>
						<View style={Styles.studentBody}>
							{Object.keys(studentInfo).length > 0 && (
								<View style={{ marginVertical: 5 }}>
									<View>
										<View style={Styles.studentCard}>
											<View style={{ marginHorizontal: 5 }}>
												<CustomText bold color={colors.darkGrey}>
													{StudentFirstName} {StudentLastName} ({CardCode})
												</CustomText>
												<View style={Styles.cardField}>
													<CustomText muted small bold>
														Class: {AdmissionClass}
													</CustomText>
													<CustomText muted small bold>
														Section: {Section}
													</CustomText>
												</View>
											</View>
										</View>
									</View>
								</View>
							)}
						</View>
					</View>
				</Formik>
			) : (
				<Empty description={'No Student Details available'} />
			)}
			{/* )} */}
		</View>
	);
};

export default StudentCard;

const Styles = StyleSheet.create({
	container: {
		// flex: 1
	},
	cardHeader: {
		backgroundColor: colors.title,
		width: '100%',
		justifyContent: 'center',
		paddingLeft: 15,
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5
	},
	studentCard: {
		backgroundColor: colors.white,
		borderRadius: 8,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center'
	},
	studentBody: {
		padding: 10,
		backgroundColor: colors.white,
		marginBottom: 10,
		borderBottomEndRadius: 8,
		borderBottomStartRadius: 8
	},
	cardField: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 5
	}
});

import React, { useEffect, useState } from 'react';
import {
	View,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView,
	StatusBar,
	ImageBackground,
	SafeAreaView,
	Keyboard,
	Linking,
	Platform
} from 'react-native';
import { Formik } from 'formik';
import CustomText from '../../../components/CustomText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { colors } from '../../../utils/config';
import inStyle from './style';
import FormField from '../../../components/form-field';
import API_CALL from '../../../services';
import { logIn } from '../../../services/auth/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetails } from '../../../services/user-details/action';
import Loader from '../../../components/Loader';

const Login = ({ navigation }) => {
	const [ loginError, setLoginError ] = useState(''),
		[ loader, setLoader ] = useState(false),
		[ deviceID, setDeviceID ] = useState('');

	const dispatch = useDispatch();
	return (
		<KeyboardAvoidingView style={inStyle.content}>
			<StatusBar backgroundColor={colors.appBackground} barStyle="dark-content" animated={false} />
			<View style={{ padding: 20, flex: 1 }}>
				<Formik
					initialValues={{
						EmailId: 'sureshmscg@gmail.com',
						Password: 'Kusuma@485'
					}}
					enableReinitialize={true}
					validate={(values) => {
						let errors = {},
							emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/,
							passwordRegex = /^([a-zA-Z0-9._,!"'-:;()!@#$%^&*\s]{8,})$/;
						if (!values.EmailId) errors.EmailId = 'Required';
						else if (!emailRegex.test(values.EmailId)) errors.EmailId = 'Please enter valid Email';
						if (!values.Password) errors.Password = 'Required';
						else if (!passwordRegex.test(values.Password)) errors.Password = 'Please enter valid Password';
						else if (values.Password.length > 40)
							errors.Password = 'Password should not more than 40 characters';
						return errors;
					}}
					onSubmit={(values) => {
						Keyboard.dismiss();
						setLoader(true);
						API_CALL({
							method: 'post',
							url: 'LoginUser',
							data: values,
							callback: async ({ status, data }) => {
								if (status === 200 && data.emailid != null) {
									console.log('Status', status, 'Data', data);
									await AsyncStorage.setItem('activity', JSON.stringify(0));
									await AsyncStorage.setItem('session', data.emailid);
									dispatch(getUserDetails(data));
									await AsyncStorage.setItem('userDetails', JSON.stringify(data));
									dispatch(logIn());
									setLoader(false);
								} else {
									setLoader(false);
									setLoginError('Invalid Email/Password');
								}
							}
						});
					}}
				>
					{({ handleSubmit }) => (
						<SafeAreaView>
							<Loader show={loader} />
							<View style={{ marginTop: 10 }} />
							<CustomText large bold>
								Log in to Anand Foods
							</CustomText>
							<View style={{ marginBottom: 10 }} />
							<FormField name="EmailId" type="text" placeholder="Email" />
							<View style={{ marginBottom: 10 }} />
							<FormField name="Password" secureTextEntry={true} type="password" placeholder="Password" />

							<TouchableOpacity style={inStyle.signin_button} onPress={handleSubmit}>
								<CustomText bold white>
									LOG IN
								</CustomText>
							</TouchableOpacity>
							{loginError ? (
								<View style={inStyle.errorView}>
									<CustomText danger>{loginError}</CustomText>
								</View>
							) : null}
							<TouchableOpacity
								style={inStyle.link}
								onPress={() => {
									// navigation.navigate('ForgotPassword');
								}}
							>
								<CustomText bold color={colors.primary} underline>
									Reset Password?
								</CustomText>
							</TouchableOpacity>
						</SafeAreaView>
					)}
				</Formik>

				{/* </View> */}
			</View>
		</KeyboardAvoidingView>
	);
};
export default Login;

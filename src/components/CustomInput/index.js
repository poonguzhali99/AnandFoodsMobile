import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/config';
import CustomText from '../CustomText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import normalizeText from '../common-components/normalizeText';
const CustomInput = (props) => {
	let { handleOnChange, handleOnBlur, handleOnError, type, showError = true } = props;
	const [ errorMessage, setErrorMessage ] = useState(''),
		[ showPassword, setShowPassword ] = useState(false);
	const inputError = (value, type) => {
		let error,
			emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/,
			passwordRegex = /^([a-zA-Z0-9._,!"'-:;()!@#$%^&*\s]{8,})$/;
		if (type == 'email') {
			if (!value) error = 'Email required';
			else if (!emailRegex.test(value)) error = 'Please enter valid Email';
			else error = '';
			setErrorMessage(error);
			handleOnError && handleOnError(error ? true : false);
		} else if (type == 'password') {
			if (!value) error = 'Password required';
			else if (!passwordRegex.test(value)) error = 'Please enter valid Password';
			else error = '';
			setErrorMessage(error);
			handleOnError && handleOnError(error ? true : false);
		} else {
			if (!value) error = 'Required';
			setErrorMessage(error);
		}

		return errorMessage;
	};
	return (
		<View style={{ marginVertical: 8 }}>
			<TextInput
				{...props}
				style={errorMessage && showError ? [ styles.input, { borderColor: colors.danger } ] : styles.input}
				autoCapitalize="none"
				autoCorrect={false}
				placeholderTextColor={colors.placeHolderGrey}
				selectionColor={colors.primary}
				secureTextEntry={type == 'password' && !showPassword ? true : false}
				onChangeText={async (value) => {
					handleOnChange && handleOnChange(value);
					inputError(value, type);
				}}
				onBlur={async (res) => {
					// handleOnChange && handleOnChange(res.nativeEvent.text);
					handleOnBlur && handleOnBlur(res.nativeEvent.text);
					inputError(res.nativeEvent.text, type);
				}}
				onEndEditing={async (res) => {
					handleOnBlur && handleOnBlur(res.nativeEvent.text);
					inputError(res.nativeEvent.text, type);
				}}
			/>
			{type == 'password' && (
				<TouchableOpacity
					onPress={() => setShowPassword(!showPassword)}
					style={{ position: 'absolute', right: 12, top: 12 }}
				>
					{showPassword ? (
						<FontAwesome name="eye" color={colors.green} size={22} />
					) : (
						<FontAwesome name="eye-slash" color={colors.placeHolderGrey} size={22} />
					)}
				</TouchableOpacity>
			)}
			{errorMessage && showError ? <CustomText danger>{errorMessage}</CustomText> : null}
		</View>
	);
};

export default CustomInput;

const styles = StyleSheet.create({
	input: {
		paddingLeft: 10,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colors.grey_2,
		height: 50,
		width: '100%',
		minWidth: '48%',
		fontSize: normalizeText(17),
		color: colors.black,
		backgroundColor: colors.white
	}
	// errorInput: {
	// 	paddingLeft: 10,
	// 	borderWidth: 1,
	// 	borderRadius: 8,
	// 	borderColor: colors.danger,
	// 	height: 50,
	// 	width: '100%',
	// 	minWidth: '48%',
	// 	fontSize: normalizeText(17),
	// 	color: colors.black,
	// 	backgroundColor: colors.white
	// }
});

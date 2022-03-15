import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { colors } from '../../utils/config';
import CustomText from '../CustomText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Empty from '../empty';
import normalizeText from '../common-components/normalizeText';

const CustomModal = (props) => {
	let {
		data,
		handleOnChange,
		keyword,
		label,
		placeholder,
		handleOnError,
		value,
		showError = true,
		style,
		initValue
	} = props;
	const [ modalVisible, setModalVisible ] = useState(false),
		[ errorMessage, setErrorMessage ] = useState('');

	let newData = [];
	let init;
	for (let value of data) {
		newData.push({
			id: value[keyword],
			label: value[label]
		});
		if (value[keyword] == initValue) {
			init = value[label];
		}
	}
	const [ val, setVal ] = useState(init);
	const inputError = () => {
		let error;
		if (val == '') error = 'Required';
		setErrorMessage(error);
		handleOnError && handleOnError(error ? true : false);
	};

	const renderSeparator = () => (
		<View
			style={{
				backgroundColor: colors.grey_2,
				height: 1
			}}
		/>
	);

	return (
		<View>
			<TouchableOpacity
				onPress={() => {
					setModalVisible(!modalVisible);
					setVal('');
				}}
				style={{ alignItems: 'center' }}
			>
				<TextInput
					{...props}
					placeholder={placeholder ? `Select ${placeholder}` : 'Select...'}
					placeholderTextColor={colors.placeHolderGrey}
					style={style ? [ Styles.input, style ] : Styles.input}
					editable={false}
					pointerEvents="none"
					value={val ? val : value}
					placeholderTextColor={colors.placeHolderGrey}
					disabled={true}
					autoCorrect={false}
					selectionColor={colors.primary}
				/>
				<FontAwesome
					name="angle-down"
					color={colors.primary}
					size={25}
					style={{ position: 'absolute', right: 12, top: 10 }}
				/>
			</TouchableOpacity>

			<Modal
				isVisible={modalVisible}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				onBackdropPress={() => setModalVisible(false)}
			>
				<View style={Styles.centeredView}>
					<View style={Styles.modalView}>
						<View
							style={{
								flexDirection: 'row',
								padding: 10,
								width: '100%',
								backgroundColor: colors.primary,
								borderTopLeftRadius: 10,
								borderTopRightRadius: 10,
								justifyContent: 'space-between'
							}}
						>
							<CustomText bold white medium>
								{placeholder ? `Select ${placeholder} ` : 'Select...'}
							</CustomText>
							<TouchableOpacity
								// style={{ position: 'absolute', right: 10, top: 13 }}
								onPress={() => {
									inputError();
									setModalVisible(!modalVisible);
								}}
							>
								<FontAwesome name="times" color={colors.white} size={23} />
							</TouchableOpacity>
						</View>
						{newData && Array.isArray(newData) && newData.length > 0 ? (
							<FlatList
								data={newData}
								keyExtractor={(item, index) => index.toString()}
								ItemSeparatorComponent={renderSeparator}
								renderItem={({ item }) => {
									return (
										<TouchableOpacity
											style={{ padding: 10 }}
											onPress={async () => {
												handleOnChange && handleOnChange(item.id);
												setVal(item.label);
												setModalVisible(false);
												setErrorMessage('');
											}}
										>
											<CustomText>{item.label}</CustomText>
										</TouchableOpacity>
									);
								}}
							/>
						) : (
							<Empty />
						)}
					</View>
				</View>
			</Modal>
			{errorMessage && showError ? <CustomText danger>{errorMessage}</CustomText> : null}
		</View>
	);
};

export default CustomModal;

const Styles = StyleSheet.create({
	input: {
		paddingLeft: 10,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colors.grey_2,
		height: 50,
		minWidth: '48%',
		width: '100%',
		fontSize: normalizeText(17),
		color: colors.black,
		backgroundColor: colors.white
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		minHeight: '20%',
		maxHeight: '60%',
		width: '75%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	}
});

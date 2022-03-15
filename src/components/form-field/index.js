import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Field } from 'formik';
import { colors } from '../../utils/config';
import inStyle from './style';
import CustomText from '../CustomText';
import Empty from '../empty';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const generateComponent = (data) => {
	let {
		secureTextEntry,
		type,
		style,
		disabled,
		editable,
		keyword,
		passwordEye,
		label,
		muted,
		featureDate,
		featureDateWithNumber,
		pastDate,
		pastDateWithNumber,
		placeholder,
		form: { touched, errors },
		form,
		field: { name },
		field,
		keyboardType,
		onChange,
		value,
		handleOnBlur,
		handleOnChange
	} = data;
	onChange
		? (field = {
				...field,
				onChange
			})
		: null;
	value
		? (field = {
				...field,
				value
			})
		: null;

	const [ modalVisible, setModalVisible ] = useState(false);
	const renderSeparator = () => <View style={inStyle.line} />;

	const getValue = (value, newData) => {
		let singleObj = newData.find(({ id }) => id == value);
		return singleObj && singleObj.label;
	};

	if (type == 'modal') {
		let error = errors[name] && touched[name];
		const { errorSection, errorIcon } = inStyle;
		let newData = [];
		if (data.data && Array.isArray(data.data) && data.data.length > 0) {
			for (let val of data.data) {
				newData.push({
					id: val[keyword],
					label: val[label]
				});
			}
		}

		return (
			<View>
				<TouchableOpacity
					disabled={muted}
					onPress={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<TextInput
						{...field}
						placeholder={placeholder ? `Select ${placeholder}` : 'Select...'}
						placeholderTextColor={colors.placeHolderGrey}
						style={[ inStyle.input, { paddingRight: 28 } ]}
						editable={false}
						pointerEvents="none"
						value={field.value ? getValue(field.value, newData) : ''}
						autoCorrect={false}
						selectionColor={colors.primary}
					/>
					<FontAwesome
						name="angle-down"
						color={colors.muted}
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
					<View style={inStyle.centeredView}>
						<View style={inStyle.modalView}>
							<View style={inStyle.modalContainer}>
								<CustomText bold white medium style={{ margin: 10 }}>
									{placeholder ? `Select ${placeholder} ` : 'Select...'}
								</CustomText>
								<TouchableOpacity
									style={{
										alignItems: 'center',
										justifyContent: 'center',
										paddingHorizontal: 10
									}}
									onPress={() => {
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
									showsVerticalScrollIndicator={false}
									ListEmptyComponent={<Empty description="No Data" />}
									renderItem={({ item }) => {
										// if (newData.length > 0) {
										return (
											<TouchableOpacity
												style={{
													padding: 10,
													flexDirection: 'row',
													justifyContent: 'space-between'
												}}
												onPress={async () => {
													await form.setFieldValue(field.name, item.id);
													handleOnChange && handleOnChange(item.id);
													setModalVisible(false);
												}}
											>
												<CustomText>{item.label}</CustomText>
												{item.id == field.value && (
													<FontAwesome name="check" color={colors.success} size={20} />
												)}
											</TouchableOpacity>
										);
										// } else {
										// 	return <Empty />;
										// }
									}}
								/>
							) : (
								<Empty />
							)}
						</View>
					</View>
				</Modal>
				{error ? (
					<View style={errorSection}>
						{/* <Icon name='alert-circle-outline' type='MaterialCommunityIcons' style={errorIcon} /> */}
						<CustomText style={{ color: colors.danger }}>{errors[name]}</CustomText>
					</View>
				) : null}
			</View>
		);
	} else if (type == 'search') {
		let error = errors[name] && touched[name];
		const { errorSection, errorIcon } = inStyle;
		let newData = [];
		if (data.data && Array(data.data) && data.data.length > 0) {
			for (let val of data.data) {
				newData.push({
					id: val[keyword],
					label: val[label]
				});
			}
		}
		const [ searchedArray, setSearchedArray ] = useState(newData);
		return (
			<View>
				<TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
					<TextInput
						{...field}
						placeholder={placeholder ? `Select ${placeholder}` : 'Select...'}
						placeholderTextColor={colors.placeHolderGrey}
						style={inStyle.input}
						editable={false}
						pointerEvents="none"
						value={field.value ? getValue(field.value, newData) : ''}
						disabled={disabled}
						secureTextEntry={secureTextEntry}
						autoCorrect={false}
						selectionColor={colors.primary}
					/>
					<FontAwesome
						name="angle-down"
						color={colors.title}
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
					<View style={inStyle.searchContainer}>
						<View style={inStyle.searchTitle}>
							<TouchableOpacity
								style={inStyle.cancelButton}
								onPress={() => {
									setModalVisible(!modalVisible);
								}}
							>
								<CustomText bold color={colors.primary}>
									Cancel
								</CustomText>
							</TouchableOpacity>
							<TextInput
								style={[ inStyle.input, { width: '80%' } ]}
								placeholder="Search..."
								onChangeText={async (value) => {
									let searchedArray = newData.filter((ap) =>
										ap.label.toLocaleLowerCase().includes(value.toLocaleLowerCase())
									);
									setSearchedArray(searchedArray);
								}}
							/>
							<FontAwesome
								name="search"
								color={colors.primary}
								size={20}
								style={{ position: 'absolute', right: 20, top: 20 }}
							/>
						</View>
						<View style={{ height: '89%', borderRadius: 10 }}>
							<View style={inStyle.searchContentTitle}>
								<CustomText white bold style={{ width: '30%' }}>
									Student ID
								</CustomText>
								<CustomText white bold style={{ width: '70%' }}>
									Student Name
								</CustomText>
							</View>
							{searchedArray && Array.isArray(searchedArray) && newData.length > 0 ? (
								<FlatList
									data={searchedArray}
									keyExtractor={(item, index) => index.toString()}
									showsVerticalScrollIndicator={false}
									showsHorizontalScrollIndicator={false}
									ItemSeparatorComponent={renderSeparator}
									renderItem={({ item }) => {
										return (
											<TouchableOpacity
												style={inStyle.searchItem}
												onPress={async () => {
													await form.setFieldValue(field.name, item.id);
													handleOnChange && handleOnChange(item.id);
													setModalVisible(false);
													setSearchedArray(newData);
												}}
											>
												<CustomText style={{ width: '28%', textAlign: 'center' }}>
													{item.id}
												</CustomText>
												<CustomText style={{ width: '4%' }}>-</CustomText>
												<View
													style={{
														width: '68%',
														flexDirection: 'row',
														justifyContent: 'space-between'
													}}
												>
													<CustomText>{item.label}</CustomText>

													{item.id == field.value && (
														<FontAwesome
															name="check"
															color={colors.success}
															style={{ marginRight: 15 }}
															size={20}
														/>
													)}
												</View>
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
				{error ? (
					<View style={errorSection}>
						{/* <Icon name='alert-circle-outline' type='MaterialCommunityIcons' style={errorIcon} /> */}
						<CustomText style={{ color: colors.danger }}>{errors[name]}</CustomText>
					</View>
				) : null}
			</View>
		);
	} else if (type == 'text-area') {
		let error = errors[name] && touched[name];
		const { errorSection, errorIcon } = inStyle;
		return (
			<View>
				<TextInput
					{...field}
					secureTextEntry={secureTextEntry}
					autoCorrect={false}
					selectionColor={colors.primary}
					multiline={true}
					numberOfLines={3}
					// style={[ inStyle.input, { height: 95, textAlignVertical: 'top' } ]}
					style={inStyle.textArea}
					keyboardType={type === 'number' ? 'number-pad' : 'default'}
					onChangeText={async (value) => {
						await form.setFieldValue(name, value);
						// handleOnChange && handleOnChange(value);
					}}
					onBlur={async (value) => {
						await form.setFieldTouched(name, true);
						// handleOnBlur && handleOnBlur(value);
					}}
					placeholder={placeholder}
					placeholderTextColor={colors.placeHolderGrey}
					disabled={disabled}
				/>
				{error ? (
					<View style={errorSection}>
						{/* <Icon name='alert-circle-outline' type='MaterialCommunityIcons' style={errorIcon} /> */}
						<CustomText style={{ color: colors.danger }}>{errors[name]}</CustomText>
					</View>
				) : null}
			</View>
		);
	} else {
		let error = errors[name] && touched[name];
		const { errorSection, errorIcon } = inStyle;
		const [ showPassword, setShowPassword ] = useState(true);
		return (
			<View>
				<TextInput
					{...field}
					key={field.name}
					secureTextEntry={showPassword ? secureTextEntry : false}
					autoCorrect={false}
					autoCapitalize="none"
					selectionColor={colors.primary}
					style={style ? style : inStyle.input}
					keyboardType={keyboardType}
					onChangeText={async (value) => {
						await form.setFieldValue(name, value);
						handleOnChange && handleOnChange(value);
					}}
					onBlur={async (value) => {
						await form.setFieldTouched(name, true);
						handleOnBlur && handleOnBlur(value);
					}}
					placeholder={placeholder}
					placeholderTextColor={colors.placeHolderGrey}
					disabled={disabled}
					editable={editable}
				/>
				{/* {passwordEye && (
					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}
						style={{ position: 'absolute', right: 12, top: 12 }}
					>
						{showPassword ? (
							<FontAwesome name="eye" color={colors.link} size={22} />
						) : (
							<FontAwesome name="eye-slash" color={colors.muted} size={22} />
						)}
					</TouchableOpacity>
				)} */}
				{error ? (
					<View style={errorSection}>
						{/* <Icon name='alert-circle-outline' type='MaterialCommunityIcons' style={errorIcon} /> */}
						<CustomText style={{ color: colors.danger }}>{errors[name]}</CustomText>
					</View>
				) : null}
			</View>
		);
	}
};

const FormField = (props) => <Field {...props} component={generateComponent} />;

export default FormField;

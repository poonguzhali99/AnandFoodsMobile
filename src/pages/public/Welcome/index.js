import React, { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, TextInput } from 'react-native';
import CustomText from '../../../components/CustomText';
import { colors, viewportHeight, viewportWidth } from '../../../utils/config';

const Welcome = ({ navigation }) => {
	return (
		<KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.white }}>
			<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
				<CustomText bold large>
					Welcome to Anand Foods.
				</CustomText>
				<CustomText bold large>
					Create Checklists.
				</CustomText>
				<CustomText bold large>
					Conduct Inspections.
				</CustomText>
			</View>
			<SafeAreaView style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 40 }}>
				<View style={{ justifyContent: 'center', marginHorizontal: 20 }}>
					<TouchableOpacity
						style={{
							backgroundColor: colors.primary,
							paddingVertical: 10,
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 10
						}}
						// onPress={() => setNoteVisible(!noteVisible)}
					>
						<CustomText white>Sign Up</CustomText>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							borderColor: colors.placeHolderGrey,
							borderWidth: 1,
							paddingVertical: 10,
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 10,
							marginTop: 10
						}}
						onPress={() => navigation.navigate('Login')}
					>
						<CustomText>Log in</CustomText>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default Welcome;

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText';
import Modal from 'react-native-modal';
import { colors } from '../../utils/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NetworkError = ({ show, title, message, btnTitle }) => {
	return (
		<Modal isVisible={show} style={styles.modal} animationInTiming={600}>
			<View style={styles.modalContainer}>
				<CustomText bold extralarge>
					{title}
				</CustomText>
				<CustomText muted medium style={styles.modalText}>
					{message}
				</CustomText>
				<TouchableOpacity disabled={true} style={styles.button}>
					<CustomText white bold medium>
						{btnTitle}
					</CustomText>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

export default NetworkError;

const styles = StyleSheet.create({
	modal: {
		justifyContent: 'flex-end',
		margin: 0
	},
	modalContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: 16,
		paddingTop: 20,
		paddingBottom: 40,
		alignItems: 'center',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8
	},

	modalText: {
		marginTop: 14,
		textAlign: 'center',
		marginBottom: 10
	},
	button: {
		backgroundColor: colors.primaryMuted,
		paddingVertical: 12,
		paddingHorizontal: 16,
		alignItems: 'center',
		marginTop: 10,
		borderRadius: 8
	}
});

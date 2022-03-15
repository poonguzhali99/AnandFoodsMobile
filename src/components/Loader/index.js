import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { colors, viewportHeight, viewportWidth } from '../../utils/config';

const Loader = ({ show }) => {
	if (show) {
		return (
			<Modal
				transparent={true}
				animationType={'none'}
				visible={show}
				onRequestClose={() => {
					console.log('close modal');
				}}
			>
				<View style={styles.modalBackground}>
					<View style={styles.activityIndicatorWrapper}>
						<ActivityIndicator animating={show} size="large" color={colors.primary} />
					</View>
				</View>
			</Modal>
		);
	} else {
		return null;
	}
};
export default Loader;

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: colors.transparent
	},
	activityIndicatorWrapper: {
		// for Modal Spinner
		// backgroundColor: '#FFFFFF',
		// height: 100,
		// width: 100,
		// borderRadius: 10,
		// display: 'flex',
		// alignItems: 'center',
		// justifyContent: 'space-around'
	}
});
// const Styles = StyleSheet.create({
// 	loaderContainer: {
// 		padding: 7,
// 		width: viewportWidth,
// 		height: viewportHeight,
// 		zIndex: 9999,
// 		elevation: 9999,
// 		top: 0,
// 		bottom: 0,
// 		position: 'absolute',
// 		backgroundColor: colors.appBackground
// 	}
// });

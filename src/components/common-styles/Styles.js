import { StyleSheet } from 'react-native';
import { colors } from '../../utils/config';

export const commonStyles = StyleSheet.create({
	btnPrimary: {
		backgroundColor: colors.primary,
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	btnSecondary: {
		borderColor: colors.placeHolderGrey,
		borderWidth: 1,
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginTop: 10
	}
});

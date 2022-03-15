import { StyleSheet } from 'react-native';
import { colors } from '../../../utils/config';

export default StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: colors.white
	},
	signin_button: {
		// alignSelf: 'center',
		borderWidth: 1,
		borderColor: colors.primary,
		padding: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: colors.primary,
		alignItems: 'center',
		borderRadius: 5,
		marginTop: 30
	},
	logo: {
		height: 150,
		width: 150,
		alignSelf: 'center',
		marginBottom: 10
	},
	link: {
		color: colors.primary,
		marginTop: 20
	},
	errorView: {
		backgroundColor: colors.grey_2,
		padding: 5,
		marginTop: 10,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center'
	},
	developerView: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

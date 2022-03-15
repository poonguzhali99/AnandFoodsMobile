import { StyleSheet } from 'react-native';
import { colors } from '../../../utils/config';

export const Styles = StyleSheet.create({
	line: {
		backgroundColor: colors.grey_2,
		height: 1
	},
	drawerHeader: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: colors.primary,
		padding: 5
	},
	userBody: {
		alignContent: 'center',
		justifyContent: 'center',
		width: '75%',
		paddingLeft: 10
	},
	image: { height: 55, width: 55, borderRadius: 55 },
	menuItem: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 45,
		flexDirection: 'row'
	},
	subMenuItem: {
		justifyContent: 'flex-start',
		paddingLeft: 30,
		alignItems: 'center',
		height: 35,
		flexDirection: 'row'
		// marginBottom: 10
	},
	signoutBtn: {
		flex: 0.06,
		justifyContent: 'center',
		alignItems: 'center',
		height: 45,
		flexDirection: 'row',
		backgroundColor: colors.title
	}
});

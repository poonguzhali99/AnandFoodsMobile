import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../utils/config';
import normalizeText from '../common-components/normalizeText';

export default StyleSheet.create({
	errorIcon: {
		fontSize: normalizeText(17),
		color: colors.error,
		paddingTop: Platform.OS === 'ios' ? 2 : 0
	},
	errorText: {
		paddingLeft: 5
	},
	errorSection: {
		color: colors.danger,
		paddingBottom: 10
	},
	input: {
		paddingLeft: 5,
		borderBottomWidth: 1,
		borderColor: colors.grey,
		height: 45,
		maxWidth: '100%',
		minWidth: '48%',
		fontSize: normalizeText(12),
		color: colors.black
		// backgroundColor: colors.white
	},
	textArea: {
		paddingLeft: 5,
		borderWidth: 1,
		borderRadius: 5,
		marginVertical: 10,
		textAlignVertical: 'top',
		borderColor: colors.placeHolderGrey,
		// selectionColor: colors.grey_2,
		height: 40,
		maxWidth: '100%',
		minWidth: '48%',
		fontSize: normalizeText(12),
		color: colors.darkGrey
		// backgroundColor: colors.grey_2
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalView: {
		backgroundColor: 'white',
		borderRadius: 10,
		maxHeight: '80%',
		width: '75%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	modalContainer: {
		flexDirection: 'row',
		// padding: 10,
		width: '100%',
		backgroundColor: colors.title,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		justifyContent: 'space-between'
	},
	line: {
		backgroundColor: colors.grey_2,
		height: 1
	},
	searchContainer: {
		backgroundColor: colors.appBackground,
		height: '98%',
		borderRadius: 10
	},
	searchTitle: {
		flexDirection: 'row',
		padding: 10,
		width: '100%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cancelButton: {
		width: '20%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	searchContentTitle: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.title,
		width: '95%',
		borderTopStartRadius: 10,
		borderTopEndRadius: 10,
		marginHorizontal: 10
	},
	searchItem: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
	},
	calendarModalView: {
		backgroundColor: 'white',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	headerWrapperStyle: {
		backgroundColor: colors.primary,
		height: 40,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10
	}
});

import React from 'react';
import { Text, StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';
import { colors } from '../../utils/config';
import normalizeText from '../common-components/normalizeText';
const CustomText = ({
	numberOfLines,
	children,
	style,
	extralarge,
	large,
	medium,
	small,
	extrasmall,
	bold,
	white,
	muted,
	danger,
	success,
	primary,
	warning,
	color,
	capitalize,
	underline
}) => {
	const { fontBold } = Styles;

	return (
		<Text
			numberOfLines={numberOfLines ? numberOfLines : 0}
			style={[
				Styles.appText,
				style ? style : {},
				extralarge ? { fontSize: normalizeText(19) } : {},
				large ? { fontSize: normalizeText(16) } : {},
				medium ? { fontSize: normalizeText(14) } : {},
				small ? { fontSize: normalizeText(9) } : {},
				extrasmall ? { fontSize: normalizeText(7) } : {},
				bold ? fontBold : {},
				white ? { color: colors.white } : {},
				muted ? { color: colors.muted } : {},
				danger ? { color: colors.danger } : {},
				primary ? { color: colors.primary } : {},
				success ? { color: colors.success } : {},
				warning ? { color: colors.warning } : {},
				color ? { color: color } : {},
				capitalize ? { textTransform: 'capitalize' } : {},
				underline ? { textDecorationLine: 'underline' } : {}
			]}
		>
			{children}
		</Text>
	);
};

export default CustomText;

const Styles = StyleSheet.create({
	appText: {
		fontSize: normalizeText(12),
		color: colors.black
	},
	fontBold: {
		fontWeight: '700'
	}
});

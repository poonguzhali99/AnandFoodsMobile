import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../utils/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Empty = ({ description }) => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				paddingHorizontal: 10,
				paddingVertical: 20,
				backgroundColor: colors.white,
				borderRadius: 8
			}}
		>
			<FontAwesome name="inbox" color={colors.grey} size={35} />
			<Text style={{ color: colors.grey }}>{description ? description : 'No Data'}</Text>
		</View>
	);
};

export default Empty;

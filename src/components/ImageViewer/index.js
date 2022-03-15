import React from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { images } from '../../utils/config';
import { NavHeader } from '../NavHeader';

const ImageViewer = ({ navigation, route }) => {
	const { filePath, title } = route.params;
	const source = { uri: `data:application/png;base64,${filePath}` };

	return (
		<SafeAreaView>
			<NavHeader title={title} left={true} navigation={navigation} academicDropDown={false} />
			<View
				style={{
					// padding: 10,
					marginTop: 10,
					justifyContent: 'flex-start',
					alignItems: 'center',
					// backgroundColor: 'red',
					height: '80%'
				}}
			>
				<Image source={source} style={styles.image} />
			</View>
		</SafeAreaView>
	);
};

export default ImageViewer;

const styles = StyleSheet.create({
	image: {
		width: '95%',
		height: '90%',
		resizeMode: 'contain'
	}
});

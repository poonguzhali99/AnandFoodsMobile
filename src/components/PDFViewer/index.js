import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Pdf from 'react-native-pdf';
import { images } from '../../utils/config';
import { NavHeader } from '../NavHeader';

const PDFViewer = ({ navigation, route }) => {
	const { filePath, title } = route.params;
	const source = { uri: `data:application/pdf;base64,${filePath}` };

	return (
		<SafeAreaView>
			<NavHeader title={title} left={true} navigation={navigation} academicDropDown={false} />
			<View>
				<Pdf
					source={source}
					onError={(error) => {
						console.log(error);
					}}
					style={styles.pdf}
				/>
			</View>
		</SafeAreaView>
	);
};

export default PDFViewer;

const styles = StyleSheet.create({
	pdf: {
		width: '100%',
		height: '95%'
	}
});

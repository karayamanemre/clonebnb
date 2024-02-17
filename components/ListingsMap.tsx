import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView from "react-native-maps";

interface Props {
	listings: any;
}

const ListingsMap = ({ listings }: Props) => {
	return (
		<View style={styles.container}>
			<MapView style={styles.map} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default ListingsMap;

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import listingsData from "@/assets/data/airbnb-listings.json";

const Page = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const listing = (listingsData as any[]).find((item) => item.id === id);

	return (
		<View style={styles.container}>
			<Text>Page</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});

export default Page;

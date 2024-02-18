import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, { SlideInDown } from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
	const router = useRouter();
	const [openCard, setOpenCard] = useState(0);
	const [selectedPlace, setSelectedPlace] = useState(0);

	const onClearAll = () => {
		setSelectedPlace(0);
		setOpenCard(0);
	};

	return (
		<BlurView
			intensity={70}
			style={styles.container}>
			<Text>Book</Text>

			{/* Footer */}
			<Animated.View
				style={defaultStyles.footer}
				entering={SlideInDown.delay(200)}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<TouchableOpacity
						onPress={onClearAll}
						style={{ justifyContent: "center" }}>
						<Text
							style={{
								fontFamily: "opens-sb",
								fontSize: 18,
								textDecorationLine: "underline",
							}}>
							Clear All
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							defaultStyles.btn,
							{
								paddingLeft: 50,
								paddingRight: 20,
							},
						]}
						onPress={() => router.back()}>
						<Ionicons
							name='search-outline'
							size={24}
							color='white'
							style={defaultStyles.btnIcon}
						/>
						<Text style={[defaultStyles.btnText]}>Search</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</BlurView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 100,
	},
});

export default Page;

import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const ModalHeaderText = () => {
	const [active, setActive] = useState(0);
	return (
		<View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
			<TouchableOpacity onPress={() => setActive(0)}>
				<Text
					style={{
						fontFamily: "opens-b",
						fontSize: 18,
						color: active === 0 ? "black" : "grey",
						textDecorationLine: active === 0 ? "underline" : "none",
					}}>
					Stays
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setActive(1)}>
				<Text
					style={{
						fontFamily: "opens-b",
						fontSize: 18,
						color: active === 1 ? "black" : "grey",
						textDecorationLine: active === 1 ? "underline" : "none",
					}}>
					Experiences
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ModalHeaderText;

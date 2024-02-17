import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
	const { signOut, isSignedIn } = useAuth();
	const { user } = useUser();
	const [firstName, setFirstName] = useState(user?.firstName);
	const [lastName, setLastName] = useState(user?.lastName);
	const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		if (!user) return;
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.emailAddresses[0].emailAddress);
	}, [user]);

	const onSaveUser = async () => {};

	const onCaptureImage = async () => {};

	return (
		<SafeAreaView style={defaultStyles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Profile</Text>
				<Ionicons
					name='notifications-outline'
					size={24}
					color='black'
				/>
			</View>

			{isSignedIn && (
				<Button
					title='Log out'
					onPress={() => signOut()}
					color={Colors.dark}
				/>
			)}

			{!isSignedIn && (
				<Link
					href={"/(modals)/login"}
					asChild>
					<Button
						title='Log in'
						color={Colors.dark}
					/>
				</Link>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 24,
	},
	header: {
		fontFamily: "opens-b",
		fontSize: 24,
	},
	card: {
		backgroundColor: "#fff",
		padding: 24,
		borderRadius: 16,
		marginHorizontal: 24,
		marginTop: 24,
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 6,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		alignItems: "center",
		gap: 14,
		marginBottom: 24,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: Colors.grey,
	},
	editRow: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},
});

export default Page;

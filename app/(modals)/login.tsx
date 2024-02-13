import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
	Apple = 'oauth_apple',
	Google = 'oauth_google',
	Facebook = 'oauth_facebook',
}

const Page = () => {
	useWarmUpBrowser();
	const router = useRouter();

	const { startOAuthFlow: appleAuth } = useOAuth({strategy: 'oauth_apple'});
	const { startOAuthFlow: googleAuth } = useOAuth({strategy: 'oauth_google'});
	const { startOAuthFlow: facebookAuth } = useOAuth({strategy: 'oauth_facebook'});

	const onSelectAuth = async (strategy: Strategy) => {
		const selectedAuth = {
			[Strategy.Apple]: appleAuth,
			[Strategy.Google]: googleAuth,
			[Strategy.Facebook]: facebookAuth,
		}[strategy];

		try {
			const { createdSessionId, setActive } = await selectedAuth();
			if (createdSessionId) {
				setActive!({session: createdSessionId});
				router.back();
			}
		} catch (error) {
			console.error('Error starting OAuth flow: ', error);
		}
	};
	
	return (
		<View style={styles.container}>
			<TextInput
				autoCapitalize='none'
				placeholder='Email'
				style={[defaultStyles.inputField, { marginBottom: 20 }]}
			/>
			<TouchableOpacity style={defaultStyles.btn}>
				<Text style={defaultStyles.btnText}>Continue</Text>
			</TouchableOpacity>

			<View style={styles.seperatorView}>
				<View
					style={{
						flex: 1,
						borderBottomColor: "#000",
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
				<Text style={styles.seperator}>or</Text>
				<View
					style={{
						flex: 1,
						borderBottomColor: "#000",
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
			</View>

			<View style={{ gap: 20 }}>
				<TouchableOpacity style={styles.btnOutline}>
					<Ionicons
						name='call-outline'
						style={defaultStyles.btnIcon}
						size={24}
					/>
					<Text style={styles.btnOutlineText}>Continue with Phone</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onSelectAuth(Strategy.Apple)} style={styles.btnOutline}>
					<Ionicons
						name='logo-apple'
						style={defaultStyles.btnIcon}
						size={24}
					/>
					<Text style={styles.btnOutlineText}>Continue with Apple</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onSelectAuth(Strategy.Google)} style={styles.btnOutline}>
					<Ionicons
						name='logo-google'
						style={defaultStyles.btnIcon}
						size={24}
					/>
					<Text style={styles.btnOutlineText}>Continue with Google</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onSelectAuth(Strategy.Facebook)} style={styles.btnOutline}>
					<Ionicons
						name='logo-facebook'
						style={defaultStyles.btnIcon}
						size={24}
					/>
					<Text style={styles.btnOutlineText}>Continue with Facebook</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 26,
	},
	seperatorView: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		marginVertical: 20,
	},
	seperator: {
		fontFamily: "opens-b",
		color: Colors.grey,
	},
	btnOutline: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: Colors.grey,
		height: 50,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		paddingHorizontal: 10,
	},
	btnOutlineText: {
		color: "#000",
		fontSize: 16,
		fontFamily: "opens-b",
	},
});

export default Page;

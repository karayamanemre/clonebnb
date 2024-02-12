import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		opens: require("../assets/fonts/OpenSans_Condensed-Light.ttf"),
		"opens-sb": require("../assets/fonts/OpenSans_Condensed-Medium.ttf"),
		"opens-b": require("../assets/fonts/OpenSans_Condensed-Bold.ttf"),
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const router = useRouter();

	return (
		<Stack>
			<Stack.Screen
				name='(tabs)'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='(modals)/login'
				options={{
					title: "Login or sign up",
					presentation: "modal",
					headerTitleStyle: {
						fontFamily: "opens-sb",
					},
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons
								name='close-outline'
								size={24}
								color='black'
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name='listing/[id]'
				options={{ headerTitle: "" }}
			/>
			<Stack.Screen
				name='(modals)/booking'
				options={{
					presentation: "transparentModal",
					animation: "fade",
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons
								name='close-outline'
								size={24}
								color='black'
							/>
						</TouchableOpacity>
					),
				}}
			/>
		</Stack>
	);
}

import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ModalHeaderText from "@/components/ModalHeaderText";
import Colors from "@/constants/Colors";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (error) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (error) {
			return;
		}
	},
};

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

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ClerkProvider
				publishableKey={CLERK_PUBLISHABLE_KEY!}
				tokenCache={tokenCache}>
				<RootLayoutNav />
			</ClerkProvider>
		</GestureHandlerRootView>
	);
}

function RootLayoutNav() {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();

	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			router.push("/(modals)/login");
		}
	}, [isLoaded]);

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
				options={{ headerTitle: "", headerTransparent: true }}
			/>
			<Stack.Screen
				name='(modals)/booking'
				options={{
					presentation: "transparentModal",
					animation: "fade",
					headerTransparent: true,
					headerTitle: () => <ModalHeaderText />,
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => router.back()}
							style={{
								backgroundColor: "white",
								borderColor: Colors.grey,
								borderRadius: 20,
								borderWidth: 1,
								padding: 4,
							}}>
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

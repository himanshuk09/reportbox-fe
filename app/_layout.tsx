import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
	fade: true,
	duration: 1500,
});
const AuthGuard = () => {
	const { session } = useAuth();

	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Protected guard={!session}>
				<Stack.Screen
					name="(public)"
					options={{ headerShown: false }}
				/>
			</Stack.Protected>
			<Stack.Protected guard={!!session}>
				<Stack.Screen
					name="(protected)"
					options={{ headerShown: false }}
				/>
			</Stack.Protected>
			<Stack.Screen name="+not-found" />
		</Stack>
	);
};
export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		return null;
	}

	return (
		<AuthProvider>
			<ThemeProvider>
				<AuthGuard />
			</ThemeProvider>
		</AuthProvider>
	);
}

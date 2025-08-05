import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider, useThemeContext } from "@/contexts/ThemeContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { AlertContainer } from "rn-custom-alert-prompt";
import "../global.css";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
	fade: true,
	// duration: 1500,
});
const AuthGuard = () => {
	const { session } = useAuth();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const { theme } = useThemeContext();
	return (
		<>
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
			<AlertContainer
				animationType="fade"
				appearance={theme}
				theme="ios"
				personalTheme={{
					cardBackgroundColor: secondaryColor,
					titleColor: textColor,
					descriptionColor: "#ccc",
					backgroundColor: "rgba(128,128,128,0.4)",
				}}
			/>
		</>
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
				{false && <FullScreenLoader />}
			</ThemeProvider>
		</AuthProvider>
	);
}

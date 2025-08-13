import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";
import AuthGuard from "./AuthGuard";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
	fade: true,
	duration: 2000,
});

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
				<LoadingProvider>
					<AuthGuard />
				</LoadingProvider>
			</ThemeProvider>
		</AuthProvider>
	);
}

// // ThemeContext.tsx
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { Appearance } from "react-native";

// const ThemeContext = createContext({
// 	theme: "light",
// 	toggleTheme: () => {},
// });

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
// 	const [theme, setTheme] = useState<"light" | "dark">("light");
// 	const [isUserPreference, setIsUserPreference] = useState(false);

// 	// Load stored theme preference or fallback to system
// 	useEffect(() => {
// 		(async () => {
// 			const storedTheme = await AsyncStorage.getItem("user-theme");
// 			if (storedTheme === "light" || storedTheme === "dark") {
// 				setTheme(storedTheme);
// 				setIsUserPreference(true);
// 			} else {
// 				setTheme(Appearance.getColorScheme() || "light");
// 			}
// 		})();
// 	}, []);

// 	// React to system theme changes only if no user preference
// 	useEffect(() => {
// 		if (isUserPreference) return;
// 		const listener = ({
// 			colorScheme,
// 		}: Appearance.AppearancePreferences) => {
// 			setTheme(colorScheme || "light");
// 		};
// 		const sub = Appearance.addChangeListener(listener);
// 		return () => sub.remove();
// 	}, [isUserPreference]);

// 	const toggleTheme = async () => {
// 		const newTheme = theme === "light" ? "dark" : "light";
// 		setTheme(newTheme);
// 		setIsUserPreference(true);
// 		await AsyncStorage.setItem("user-theme", newTheme);
// 	};

// 	return (
// 		<ThemeContext.Provider value={{ theme, toggleTheme }}>
// 			{children}
// 		</ThemeContext.Provider>
// 	);
// };

// export const useThemeContext = () => useContext(ThemeContext);
// ThemeContext.tsx (updated)
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

export type ThemeMode = "light" | "dark" | "system";

const ThemeContext = createContext({
	theme: "light" as "light" | "dark",
	mode: "system" as ThemeMode,
	setThemeMode: (_: ThemeMode) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mode, setMode] = useState<ThemeMode>("system");
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		(async () => {
			const storedMode = await AsyncStorage.getItem("theme-mode");
			if (
				storedMode === "light" ||
				storedMode === "dark" ||
				storedMode === "system"
			) {
				setMode(storedMode);
				const systemTheme = Appearance.getColorScheme() || "light";
				setTheme(storedMode === "system" ? systemTheme : storedMode);
			} else {
				setMode("system");
				setTheme(Appearance.getColorScheme() || "light");
			}
		})();
	}, []);

	useEffect(() => {
		if (mode !== "system") return;
		const listener = ({
			colorScheme,
		}: Appearance.AppearancePreferences) => {
			setTheme(colorScheme || "light");
		};
		const sub = Appearance.addChangeListener(listener);
		return () => sub.remove();
	}, [mode]);

	const setThemeMode = async (newMode: ThemeMode) => {
		setMode(newMode);
		await AsyncStorage.setItem("theme-mode", newMode);
		const systemTheme = Appearance.getColorScheme() || "light";
		setTheme(newMode === "system" ? systemTheme : newMode);
	};

	return (
		<ThemeContext.Provider value={{ theme, mode, setThemeMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => useContext(ThemeContext);

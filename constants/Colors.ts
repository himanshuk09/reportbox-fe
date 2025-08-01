/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
	light: {
		text: "#11181C",
		background: "#fff",
		tint: tintColorLight,
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: "#ECEDEE",
		background: "#151718",
		tint: tintColorDark,
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: tintColorDark,
	},
};
export const darkTheme = {
	background: "#343232",
	primary: "#00EEFF",
	text: "#1e1e1e",
	textPrimary: "#FFFFFF",
	textSecondary: "#CCCCCC",
	surface: "#444040",
	border: "#555151",
	highlight: "#00C4CC",
	danger: "#FF4C4C",
	success: "#3ED598",
	warning: "#FFB800",
};

// Light Theme (Inverted)
export const lightTheme = {
	background: "#FFFFFF",
	primary: "#00C4CC", // softened version of #00EEFF for light bg
	textPrimary: "#1C1C1C",
	textSecondary: "#4F4F4F",
	surface: "#F2F2F2",
	border: "#E0E0E0",
	highlight: "#00EEFF",
	danger: "#D63C3C",
	success: "#28A745",
	warning: "#FFA500",
};
export const DarkThemeColors = {
	background: "#1e1e1e", // main app background
	card: "#343232", // secondary surfaces (e.g., cards, modals)
	accent: "#00EEFF", // primary accent / brand color
	textPrimary: "#FFFFFF", // main text on dark background
	textSecondary: "#CCCCCC", // secondary/subdued text
};

// Light Theme Colors
export const LightThemeColors = {
	background: "#F9F9F9", // light background
	card: "#FFFFFF", // card/modal surfaces
	accent: "#00BBD6", // slightly deeper for contrast, or keep #00EEFF
	textPrimary: "#1e1e1e", // same as your dark bg, used for readable text
	textSecondary: "#444444", // for subtitles and captions
};

/* -------------------------------------------------------------------------- */
export const darkThemeColors = {
	background: "#1e1e1e", // main screen background
	surface: "#343232", // modal, card, or elevated surface (optional)
	text: "#ffffff", // default text
	primary: "#00EEFF", // accent (toggle ON, buttons, highlights)
	secondary: "#888888", // inactive text (not visible in image but common)
	switchTrack: "#ffffff", // toggle track (off state)
	switchThumb: "#00EEFF", // toggle thumb (on state)
	border: "#00EEFF", // for buttons like "English"
	buttonText: "#1e1e1e", // inside logout button
	tabBarBackground: "#1e1e1e", // bottom tab background
	tabIcon: "#ffffff", // tab icons
	tabIconActive: "#00EEFF", // active icon (if colored)
};

// LIGHT THEME EQUIVALENTS
export const lightThemeColors = {
	background: "#ffffff", // white background
	surface: "#f1f1f1", // cards/surfaces
	text: "#1e1e1e", // dark text
	primary: "#00B4C6", // slightly softened cyan for light bg
	secondary: "#444444", // for labels
	switchTrack: "#d1d1d1", // grey toggle track
	switchThumb: "#00B4C6", // toggle ON thumb
	border: "#00B4C6", // buttons like "English"
	buttonText: "#ffffff", // white text inside cyan buttons
	tabBarBackground: "#ffffff", // white tab bar
	tabIcon: "#1e1e1e", // black/dark icons
	tabIconActive: "#00B4C6", // accent when active
};

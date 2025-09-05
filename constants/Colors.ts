/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
	light: {
		primary: "#00B4C6",
		secondary: "#f1f1f1",
		text: "#1e1e1e",
		cardsColor: "#fff",
		bgLoader: "rgba(52,50,50,0.5)",
		transparentBackground: "rgba(255, 255, 255, 0.9)",
	},
	dark: {
		primary: "#00EEFF",
		secondary: "#343232",
		text: "#fff",
		cardsColor: "#1e1e1e",
		bgLoader: "rgba(241,241,241,0.4)",
		transparentBackground: "rgba(0, 0, 0, 0.9)",
	},
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

// primary #00EEFF -> #00B4C6

// text -> #fff   -> #1e1e1e

// secondary -> #343232 -> ##f1f1f1

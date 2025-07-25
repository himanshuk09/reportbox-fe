import React from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { router } from "expo-router";
import WaveHeaderScreen from "@/components/on-bording/WaveHeaderScreen";
// Adjust path as needed
// You might have a specific SVG for login, e.g., LoginIconSvg
// import LoginIconSvg from "./LoginIconSvg";

// Content for the Login Screen
function LoginContent() {
	return (
		<View style={loginStyles.contentContainer}>
			<Text style={loginStyles.title}>Sign In</Text>
			<TextInput
				style={loginStyles.input}
				placeholder="Phone number"
				placeholderTextColor="#ccc"
				keyboardType="phone-pad"
			/>
			<TouchableOpacity
				style={loginStyles.button}
				onPress={() => router.push("/(protected)/(tabs)/dashboard")}
			>
				<Text style={loginStyles.buttonText}>Get OTP</Text>
			</TouchableOpacity>
		</View>
	);
}

export default function LoginScreen() {
	return (
		<WaveHeaderScreen
			headerImageUri="https://images.pexels.com/photos/1154059/pexels-photo-1154059.jpeg"
			imageContainerHeight={0.6}
			svgStyle={{ opacity: 1 }}
		>
			<LoginContent />
		</WaveHeaderScreen>
	);
}

const loginStyles = StyleSheet.create({
	contentContainer: {},
	title: {
		fontSize: 22,
		color: "#fff",
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "left",
	},
	input: {
		borderBottomColor: "#555",
		borderBottomWidth: 1,
		color: "#fff",
		marginBottom: 20,
		paddingVertical: 8,
	},
	button: {
		backgroundColor: "#00EEFF",
		paddingVertical: 12,
		alignItems: "center",
		borderRadius: 8,
		marginTop: 20,
	},
	buttonText: {
		color: "#000",
		fontWeight: "bold",
		fontSize: 16,
	},
	forgotPassword: {
		marginTop: 15,
		alignSelf: "center",
	},
	forgotPasswordText: {
		color: "#007AFF",
		fontSize: 14,
	},
});

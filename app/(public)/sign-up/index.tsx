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

// Content for the Registration Screen
function RegistrationContent() {
	return (
		<View style={registerStyles.contentContainer}>
			<Text style={registerStyles.title}>Create Account</Text>
			<TextInput
				style={registerStyles.input}
				placeholder="Full Name"
				placeholderTextColor="#ccc"
			/>
			<TextInput
				style={registerStyles.input}
				placeholder="Email"
				placeholderTextColor="#ccc"
				keyboardType="email-address"
			/>
			<TextInput
				style={registerStyles.input}
				placeholder="Password"
				placeholderTextColor="#ccc"
				secureTextEntry
			/>
			<TouchableOpacity
				style={registerStyles.button}
				onPress={() => console.log("Register button pressed")}
			>
				<Text style={registerStyles.buttonText}>Register</Text>
			</TouchableOpacity>
		</View>
	);
}

export default function RegistrationScreen() {
	return (
		<WaveHeaderScreen
			headerImageUri="https://images.pexels.com/photos/3762804/pexels-photo-3762804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
			imageContainerHeight={0.6}
			svgStyle={{ opacity: 1 }}
		>
			<RegistrationContent />
		</WaveHeaderScreen>
	);
}
const registerStyles = StyleSheet.create({
	contentContainer: {
		flex: 1,
	},
	title: {
		fontSize: 22,
		color: "#fff",
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	input: {
		borderBottomColor: "#555",
		borderBottomWidth: 1,
		color: "#fff",
		marginBottom: 20,
		paddingVertical: 8,
	},
	button: {
		backgroundColor: "#00EEFF", // Different button color for registration
		paddingVertical: 12,
		alignItems: "center",
		borderRadius: 8,
		marginTop: 20,
	},
	buttonText: {
		color: "#fff", // White text for orange button
		fontWeight: "bold",
		fontSize: 16,
	},
});

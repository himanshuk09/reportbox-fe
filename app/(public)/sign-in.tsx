import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import WaveHeaderScreen from "@/components/on-bording/WaveHeaderScreen";

function SignInScreen() {
	return (
		<View className="px-2 pt-6">
			{/* Title */}
			<Text className="text-white text-2xl font-bold mb-8">Sign in</Text>

			{/* Label */}
			<Text className="text-white text-sm mb-2">Phone number</Text>

			{/* Input Row with +91 */}
			<View className="flex-row items-center border-b border-white pb-1 mb-8">
				<Text className="text-white text-lg mr-2">+91</Text>
				<TextInput
					placeholder="Enter phone number"
					placeholderTextColor="#ccc"
					keyboardType="phone-pad"
					className="flex-1 text-white text-base"
				/>
			</View>

			{/* Button */}
			<TouchableOpacity
				className="bg-[#00eeff] rounded-full p-3 mb-1 items-center"
				onPress={() => router.push("/(public)/sign-up/verify-otp")}
			>
				<Text className="text-black font-semibold">Get OTP</Text>
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
			<SignInScreen />
		</WaveHeaderScreen>
	);
}

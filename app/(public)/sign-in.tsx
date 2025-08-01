import WaveHeaderScreen from "@/components/on-bording/WaveHeaderScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

function SignInScreen() {
	const [phoneNo, setPhoneNo] = useState<any>("");
	const { loginWithPhone } = useAuth();
	const { primaryColor } = useAppTheme();

	return (
		<View className="px-2 pt-6">
			{/* Title */}
			<Text className="text-white text-2xl font-bold mb-8">Sign in</Text>

			{/* Label */}
			<Text className="text-white text-sm mb-2">Phone number</Text>

			{/* Input Row with +91 */}
			<View className="flex-row items-center border-b border-white pb-1 mb-2">
				<Text className="text-white text-lg mr-2">+91</Text>
				<TextInput
					placeholder="Enter phone number"
					placeholderTextColor="#ccc"
					keyboardType="phone-pad"
					className="flex-1 text-white text-base "
					value={phoneNo}
					onChangeText={setPhoneNo}
					maxLength={10}
				/>
			</View>

			{/* Button */}
			<TouchableOpacity
				className=" rounded-full p-3 mt-6 items-center"
				onPress={() => {
					loginWithPhone(phoneNo);
					router.push("/(public)/sign-up/verify-otp");
				}}
				disabled={phoneNo.length !== 10}
				style={{
					backgroundColor: primaryColor,
				}}
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

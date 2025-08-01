import WaveHeaderScreen from "@/components/on-bording/WaveHeaderScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
function VerificationScreen() {
	const { verifyOtp, session, user } = useAuth();
	const [code, setCode] = useState("");
	const { primaryColor } = useAppTheme();

	const handleKeyPress = (digit: string) => {
		if (digit === "x") {
			setCode(code.slice(0, -1));
		} else if (code.length < 4) {
			setCode(code + digit);
		}
	};

	const renderDigits = () => {
		return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "x"].map(
			(digit, idx) => (
				<TouchableOpacity
					key={idx}
					onPress={() => handleKeyPress(digit)}
					className="w-16 h-16 m-2  items-center justify-center bg-transparent"
				>
					{digit === "x" ? (
						<FontAwesome5
							name="backspace"
							size={24}
							color="white"
						/>
					) : (
						<Text className="text-white text-2xl font-bold">
							{digit}
						</Text>
					)}
				</TouchableOpacity>
			)
		);
	};

	return (
		<View className="px-6 items-center">
			<Text className="text-white text-xl font-bold mb-2">
				VERIFICATION CODE
			</Text>

			<Text className="text-gray-300  mb-6 text-center text-lg">
				Please enter verification code sent to +91 9876543210
			</Text>

			<View className="flex-row items-center justify-between w-full px-6 mb-2">
				<View className="flex-row space-x-4 mx-auto">
					{[...Array(4).keys()].map((_, i) => (
						<View
							key={i}
							className="w-14 m-1 h-14 rounded-md bg-gray-700 items-center justify-center"
						>
							<Text className="text-white text-2xl font-bold">
								{code?.[i] ?? ""}
							</Text>
						</View>
					))}
				</View>

				<View className="absolute -right-1">
					{code.length === 4 && (
						<Feather
							name="check-circle"
							size={28}
							color={primaryColor}
							onPress={() => {
								if (!verifyOtp(code)) {
									return;
								}
								router.push("/(public)/sign-up/verified");
							}}
						/>
					)}
				</View>
			</View>
			{/* Numpad */}
			<View className="flex-row flex-wrap justify-center">
				{renderDigits()}
			</View>
		</View>
	);
}

const VerifyOTP = () => {
	return (
		<WaveHeaderScreen
			headerImageUri="https://images.pexels.com/photos/1154059/pexels-photo-1154059.jpeg"
			imageContainerHeight={0.4}
			svgStyle={{ opacity: 1 }}
		>
			<VerificationScreen />
		</WaveHeaderScreen>
	);
};

export default VerifyOTP;

import WaveHeaderScreen from "@/components/on-bording/WaveHeaderScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Keyboard,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

function SignInScreen() {
	const [phoneNo, setPhoneNo] = useState<any>("");
	const { loginWithPhone } = useAuth();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const router = useRouter();
	return (
		<View className="px-2 pt-6">
			{/* Title */}
			<Text
				className=" text-3xl font-bold mb-8"
				style={{ color: textColor }}
			>
				Sign in
			</Text>

			{/* Label */}
			<Text className=" text-lg mb-2" style={{ color: textColor }}>
				Phone number
			</Text>

			{/* Input Row with +91 */}
			<View
				className="flex-row items-center border-b border-white pb-1 mb-2"
				style={{ borderColor: textColor }}
			>
				<Text className=" text-lg mr-2" style={{ color: textColor }}>
					+91
				</Text>
				<TextInput
					placeholder="Enter phone number"
					placeholderTextColor={textColor}
					keyboardType="phone-pad"
					className="flex-1 text-lg "
					value={phoneNo}
					onChangeText={setPhoneNo}
					maxLength={10}
					style={{ color: textColor }}
				/>
			</View>

			{/* Button */}
			<TouchableOpacity
				className=" rounded-full p-3 mt-6 items-center"
				onPress={() => {
					loginWithPhone(phoneNo);
					router.replace("/(public)/sign-in/verify-otp");
					Keyboard.dismiss();
				}}
				disabled={phoneNo.length !== 10}
				style={{
					backgroundColor: primaryColor,
				}}
			>
				<Text className=" font-semibold" style={{ color: textColor }}>
					Get OTP
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default function LoginScreen() {
	return (
		<WaveHeaderScreen
			headerImageUri="https://images.pexels.com/photos/1154059/pexels-photo-1154059.jpeg"
			imageContainerHeight={0.5}
			svgStyle={{ opacity: 1 }}
		>
			<SignInScreen />
		</WaveHeaderScreen>
	);
}

import WaveHeaderScreen from "@/components/on-bording/WaveHeaderScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { sendOtpRToEmail } from "@/services/auth.service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Keyboard,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";

function SignInScreen() {
	const router = useRouter();
	const { setTempData } = useAuth();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const [email, setEmail] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

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
				Email Address
			</Text>

			{/* Input Row  */}
			<View
				className="flex-row items-center border-b border-white pb-1 mb-2"
				style={{ borderColor: textColor }}
			>
				<TextInput
					placeholder="Enter email address"
					placeholderTextColor={textColor}
					keyboardType="email-address"
					className="flex-1 text-lg"
					autoCapitalize="none"
					autoCorrect={false}
					value={email}
					onChangeText={setEmail}
					style={{ color: textColor }}
				/>
			</View>

			{/* Button */}
			<TouchableOpacity
				className="rounded-full p-3 mt-6 items-center"
				onPress={async () => {
					setTempData("email", email);
					if (loading) return;
					setLoading(true);
					Keyboard.dismiss();
					const status = await sendOtpRToEmail({ email });
					if (status) {
						Toast.show({
							type: "success",
							text1: "OTP sent successfully.",
						});
						router.push("/(public)/sign-in/verify-otp");
					} else {
						Toast.show({
							type: "error",
							text1: "Unabled to sent OTP.",
						});
					}
					setLoading(false);
				}}
				disabled={!isValidEmail(email) || loading}
				style={{
					backgroundColor: isValidEmail(email)
						? primaryColor
						: "#aaa",
				}}
			>
				{loading ? (
					<ActivityIndicator color={secondaryColor} size={"small"} />
				) : (
					<Text className="font-semibold" style={{ color: "#fff" }}>
						Get OTP
					</Text>
				)}
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

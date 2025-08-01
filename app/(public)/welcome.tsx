import { Text, TouchableOpacity, View } from "react-native";

import WaveHeaderScreen from "@/components/on-bording/WaveHeaderScreen";
import { useAppTheme } from "@/hooks/useAppTheme";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";

function WelcomeCard() {
	const { primaryColor } = useAppTheme();

	return (
		<View>
			<Text className="text-white text-3xl font-semibold">
				Welcome to{" "}
				<Text className="text-cyan-400 font-bold">Report Box</Text>
			</Text>

			<Text className="text-white text-3xl font-semibold mt-4">
				Your Voice, Heard
			</Text>

			<Text className="text-gray-400 text-md mt-1">
				Transforming Complaints into solution
			</Text>

			<TouchableOpacity
				className="flex-row items-center justify-end mt-28 "
				onPress={() => router.replace("/(public)/sign-in")}
			>
				<Text className="text-white text-2xl mr-2">Continue</Text>

				<View
					className=" rounded-full p-2"
					style={{
						backgroundColor: primaryColor,
					}}
				>
					<AntDesign name="arrowright" size={24} color="#fff" />
				</View>
			</TouchableOpacity>
		</View>
	);
}
export default function WelcommeScreen() {
	return (
		<WaveHeaderScreen
			headerImageUri="https://images.pexels.com/photos/1154059/pexels-photo-1154059.jpeg"
			imageContainerHeight={0.6}
			svgStyle={{ opacity: 1 }}
		>
			<WelcomeCard />
		</WaveHeaderScreen>
	);
}

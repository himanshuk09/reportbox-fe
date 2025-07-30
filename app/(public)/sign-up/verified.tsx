import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

import React from "react";
import { AntDesign } from "@expo/vector-icons";
import WaveHeaderScreen from "@/components/on-bording/WaveHeaderScreen";
import { router } from "expo-router";
const { height, width } = Dimensions.get("window");
function VerificationSuccessScreen() {
	return (
		<View className="flex-1 relative justify-center">
			{/* Other content below */}
			<View className="px-2 items-center pt-6">
				<Text className="text-white text-xl font-bold mb-3 text-center">
					Report Issues Instantly
				</Text>

				<Text className="text-gray-300 text-md mb-10 text-center">
					Spotted a problem? Submit complaints quickly by describing
					the issue, adding photos, and choosing a location.
				</Text>

				<TouchableOpacity className="flex-row items-center space-x-2" onPress={()=>router.push("/(public)/sign-up/profile-form")}>
					<Text className="text-white  text-2xl font-semibold">
						Let’s complete your profile
					</Text>
					<View className="bg-[#00eeff] rounded-full p-2 ml-1">
						<AntDesign name="arrowright" size={22} color="#fff" />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const Verified = () => {
	const floatingCard = (
		<View className="bg-white rounded-3xl p-6 w-72 items-center shadow-lg">
			<Text className="text-center text-base font-bold text-[#ccc] mb-2">
				You’ve been verified
			</Text>
			<Image
				source={{
					uri: "https://media.istockphoto.com/id/2150831290/vector/3d-handshake-hold-hands-with-blue-sleeve-vector-icon-cartoon-partnership-arm-gesture.jpg?s=612x612&w=0&k=20&c=_M9LSLypat10SHh_h6hpPQOzjmnotUq43hL0Lww1Q5g=",
				}}
				
				height={100}
				width={150}
				resizeMode="stretch"
			/>
		</View>
	);
	return (
		<WaveHeaderScreen
			headerImageUri="https://images.pexels.com/photos/1154059/pexels-photo-1154059.jpeg"
			imageContainerHeight={0.6}
			svgStyle={{ opacity: 1 }}
			floatingOverlay={floatingCard}
		>
			<VerificationSuccessScreen />
		</WaveHeaderScreen>
	);
};

export default Verified;

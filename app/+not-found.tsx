import React from "react";
import { View } from "react-native";

const NotFoundScreen = () => {
	return <View />;
};

export default NotFoundScreen;

// import { useRouter } from "expo-router";
// import { Text, TouchableOpacity, View } from "react-native";

// const NotFoundScreen = () => {
// 	const router = useRouter();

// 	return (
// 		<View className="flex-1 justify-center items-center bg-white px-6">
// 			{/* Update bg-white with your theme background color */}
// 			<Text className="text-4xl font-bold text-gray-800 mb-4">404</Text>
// 			<Text className="text-2xl font-semibold text-gray-700 mb-2">
// 				Page Not Found
// 			</Text>
// 			<Text className="text-center text-gray-500 mb-6">
// 				Sorry! The page you're looking for doesn't exist.
// 			</Text>
// 			<TouchableOpacity
// 				className="bg-blue-500 px-6 py-3 rounded-full"
// 				onPress={() => router.push("/")}
// 			>
// 				<Text className="text-white font-semibold text-lg">
// 					Go Home
// 				</Text>
// 			</TouchableOpacity>
// 		</View>
// 	);
// };

// export default NotFoundScreen;

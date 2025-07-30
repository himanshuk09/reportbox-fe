import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Inital = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#343232",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<TouchableOpacity
				className="bg-[#00EEFF] my-3 mx-5 px-7 p-3 rounded-lg "
				onPress={() => router.push("/(public)/sign-in")}
			>
				<Text className="text-center "> Signin</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className="bg-[#00EEFF] my-3 mx-5 px-7 p-3 rounded-lg "
				onPress={() => router.push("/(protected)/(tabs)/dashboard")}
			>
				<Text className="text-center "> Dashboard</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Inital;


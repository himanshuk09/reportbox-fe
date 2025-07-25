import { WavyHeaderBackground } from "@/components/test/WaveBanner";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, View } from "react-native";

const ProtectedLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
					title: "", // Set your screen title here
					headerStyle: {
						backgroundColor: "#00EEFF", // Background color of the header
					},
					// headerTintColor: "#fff", // Color of back button and title
					// headerTitleAlign: "center", // Align title to center
					// headerTitleStyle: {
					// 	fontWeight: "bold",
					// 	fontSize: 20,
					// },
					header: () => (
						<SafeAreaView style={{ backgroundColor: "#00EEFF" }}>
							<View
								style={{
									backgroundColor: "#00EEFF",
									height: 80,
									marginTop: 30,
								}}
							>
								<WavyHeaderBackground />
							</View>
						</SafeAreaView>
					),
				}}
			/>
			<Stack.Screen
				name="edit"
				options={{
					headerShown: false,
					title: "", // Set your screen title here
					headerStyle: {
						backgroundColor: "#00EEFF", // Background color of the header
					},
					// headerTintColor: "#fff", // Color of back button and title
					// headerTitleAlign: "center", // Align title to center
					// headerTitleStyle: {
					// 	fontWeight: "bold",
					// 	fontSize: 20,
					// },
					header: () => (
						<SafeAreaView style={{ backgroundColor: "#00EEFF" }}>
							<View
								style={{
									backgroundColor: "#00EEFF",
									height: 80,
									marginTop: 30,
								}}
							>
								<WavyHeaderBackground />
							</View>
						</SafeAreaView>
					),
				}}
			/>
		</Stack>
	);
};

export default ProtectedLayout;

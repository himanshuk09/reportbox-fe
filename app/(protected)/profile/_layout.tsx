import StackHeader from "@/components/StackHeader";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

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

					header: () => (
						<SafeAreaView style={{ backgroundColor: "#00EEFF" }}>
							<StackHeader
								showBackIcon={false}
								showMenuDrawer={false}
								showThreeDots={false}
							/>
						</SafeAreaView>
					),
				}}
			/>
		</Stack>
	);
};

export default ProtectedLayout;

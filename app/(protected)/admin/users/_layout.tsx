import StackHeader from "@/components/StackHeader";
import { Stack, useNavigation } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const AdminUserLayout = () => {
	const navigation = useNavigation();

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: "#00EEFF",
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: "#00EEFF" }}>
							<StackHeader showThreeDots={false} />
						</SafeAreaView>
					),
				})}
			/>
			<Stack.Screen
				name="[userID]"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: "#00EEFF",
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: "#00EEFF" }}>
							<StackHeader showThreeDots={false} />
						</SafeAreaView>
					),
				})}
			/>
		</Stack>
	);
};

export default AdminUserLayout;

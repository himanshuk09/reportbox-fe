import StackHeader from "@/components/StackHeader";
import { Stack, useNavigation } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const AdminLayout = () => {
	const navigation = useNavigation();

	return (
		<Stack>
			<Stack.Screen
				name="assigned"
				options={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: "#00EEFF",
					headerTransparent: true,
				})}
			/>
			<Stack.Screen
				name="users"
				options={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: "#00EEFF",
					headerTransparent: true,
				})}
			/>
			<Stack.Screen
				name="rights"
				options={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: "#00EEFF",
					headerTransparent: true,
				})}
			/>
			<Stack.Screen
				name="complaints/[complaintID]"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: "#00EEFF",
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: "#00EEFF" }}>
							<StackHeader
								showBackIcon={true}
								showMenuDrawer={false}
								showThreeDots={false}
							/>
						</SafeAreaView>
					),
				})}
			/>
		</Stack>
	);
};

export default AdminLayout;

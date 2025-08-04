import StackHeader from "@/components/StackHeader";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const AdminLayout = () => {
	const { primaryColor } = useAppTheme();

	return (
		<Stack>
			<Stack.Screen
				name="assigned"
				options={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
				})}
			/>
			<Stack.Screen
				name="users"
				options={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
				})}
			/>
			<Stack.Screen
				name="rights"
				options={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
				})}
			/>
			<Stack.Screen
				name="complaints/[complaintID]"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
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

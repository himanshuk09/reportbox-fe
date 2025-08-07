import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import React from "react";

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
		</Stack>
	);
};

export default AdminLayout;

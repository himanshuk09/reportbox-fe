import StackHeader from "@/components/ui/StackHeader";
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
				name="notification"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					animation: "simple_push",
					title: "Help",
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<StackHeader
								showBackIcon={false}
								showMenuDrawer={true}
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

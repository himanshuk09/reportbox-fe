import StackHeader from "@/components/StackHeader";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const RightLayout = () => {
	const { primaryColor } = useAppTheme();

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<StackHeader showThreeDots={false} />
						</SafeAreaView>
					),
				})}
			/>
			<Stack.Screen
				name="create-groups"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<StackHeader showThreeDots={false} />
						</SafeAreaView>
					),
				})}
			/>
			<Stack.Screen
				name="assigned-users"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<StackHeader showThreeDots={false} />
						</SafeAreaView>
					),
				})}
			/>
			<Stack.Screen
				name="assigned-rights"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<StackHeader showThreeDots={false} />
						</SafeAreaView>
					),
				})}
			/>
		</Stack>
	);
};

export default RightLayout;

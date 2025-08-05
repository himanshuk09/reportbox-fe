import StackHeader from "@/components/ui/StackHeader";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const ComplaintLayout = () => {
	const { primaryColor } = useAppTheme();

	return (
		<Stack>
			<Stack.Screen
				name="progress"
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
			<Stack.Screen
				name="add"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
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

			<Stack.Screen
				name="history"
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
			<Stack.Screen
				name="view/[id]"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
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
			<Stack.Screen
				name="edit/[id]"
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
			<Stack.Screen
				name="subtype/[type]"
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

export default ComplaintLayout;

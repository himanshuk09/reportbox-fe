import StackHeader from "@/components/StackHeader";
import { Stack, useNavigation } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const RightLayout = () => {
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
				name="create-groups"
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
				name="assigned-users"
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
				name="assigned-rights"
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

export default RightLayout;

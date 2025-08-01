import StackHeader from "@/components/StackHeader";
import { SpecialTabButton } from "@/components/test/SpecialTabButton";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const TabLayout = () => {
	const { primaryColor, secondaryColor, cardsColor } = useAppTheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: primaryColor,
				tabBarInactiveTintColor: "#727272",
				tabBarBadgeStyle: {
					backgroundColor: secondaryColor,
					color: secondaryColor,
				},
				headerPressOpacity: 1,
				tabBarIconStyle: {
					marginTop: 13,
				},
				animation: "none",
				tabBarStyle: {
					position: "absolute",
					bottom: 10,
					left: 20,
					right: 20,
					height: 70,
					backgroundColor: cardsColor,
					borderRadius: 35,
					borderTopWidth: 0,
					elevation: 0,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.1,
					shadowRadius: 10,
					paddingHorizontal: 20,
					marginBottom: 20,
					marginHorizontal: 20,
				},
			}}
		>
			<Tabs.Screen
				name="dashboard"
				options={{
					title: "",
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" color={color} size={size} />
					),
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<StackHeader showThreeDots={false} />
						</SafeAreaView>
					),
				}}
			/>

			<Tabs.Screen
				name="feed"
				options={{
					title: "",
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						// <Ionicons name="search" color={color} size={size} />
						<MaterialIcons
							name="dynamic-feed"
							color={color}
							size={size}
						/>
					),
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<StackHeader showThreeDots={false} />
						</SafeAreaView>
					),
				}}
			/>

			<Tabs.Screen
				name="hidden"
				options={{
					title: "",
					tabBarLabel: "",
					tabBarButton: SpecialTabButton,
				}}
			/>
			<Tabs.Protected guard={true}>
				<Tabs.Screen
					name="notifications"
					listeners={{
						tabPress: (e) => {
							// e.preventDefault();
							// navigation.dispatch(DrawerActions.openDrawer());
							// route.push("/");
						},

						tabLongPress: () => {},
					}}
					options={{
						title: "",
						headerShown: true,
						tabBarIcon: ({ color, size }) => (
							<Ionicons
								name="notifications"
								color={color}
								size={size}
							/>
						),
						tabBarActiveTintColor: primaryColor,
						headerTransparent: true,
						header: () => (
							<SafeAreaView
								style={{ backgroundColor: primaryColor }}
							>
								<StackHeader showThreeDots={false} />
							</SafeAreaView>
						),
					}}
				/>
			</Tabs.Protected>
			<Tabs.Screen
				name="my-complaints"
				options={{
					title: "",
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="chat-alert"
							color={color}
							size={size}
						/>
					),
					tabBarActiveTintColor: primaryColor,
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: primaryColor }}>
							<StackHeader
								onmenuTitlePress={() =>
									router.push(
										"/(protected)/complaints/history"
									)
								}
							/>
						</SafeAreaView>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;

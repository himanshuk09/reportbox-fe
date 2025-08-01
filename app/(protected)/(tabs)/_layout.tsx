import StackHeader from "@/components/StackHeader";
import { SpecialTabButton } from "@/components/test/SpecialTabButton";
import {
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { router, Tabs, useNavigation } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const TabLayout = () => {
	const navigation = useNavigation();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#00EEFF",
				tabBarInactiveTintColor: "#727272",
				tabBarBadgeStyle: {
					backgroundColor: "#343232",
					color: "#343232",
				},
				headerPressOpacity: 1,
				// tabBarStyle: Platform.select({
				// 	ios: {
				// 		backgroundColor: "#343232", // ✅ Tab bar background color
				// 		position: "absolute",
				// 		borderTopWidth: 0, // ✅ Remove top line
				// 		shadowOpacity: 0, // ✅ Remove shadow
				// 	},
				// 	default: {
				// 		backgroundColor: "#343232", // ✅ Tab bar background color
				// 		padding: 10,
				// 		marginBottom: 5,
				// 		borderTopWidth: 0, // ✅ Remove top line
				// 		elevation: 0, // ✅ Remove Android shadow
				// 		// borderTopLeftRadius: 20, // ✅ Rounded top corners
				// 		// borderTopRightRadius: 20,
				// 		// overflow: "hidden",
				// 	},
				// }),
				tabBarIconStyle: {
					marginTop: 13, // ✅ Adds space above the icons
				},
				animation: "none", // Custom animation
				tabBarStyle: {
					position: "absolute",
					bottom: 10,
					left: 20,
					right: 20,
					height: 70,
					backgroundColor: "#1c1c1e",
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
					tabBarActiveTintColor: "#00EEFF",
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: "#00EEFF" }}>
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
					tabBarActiveTintColor: "#00EEFF",
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: "#00EEFF" }}>
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
						tabBarActiveTintColor: "#00EEFF",
						headerTransparent: true,
						header: () => (
							<SafeAreaView
								style={{ backgroundColor: "#00EEFF" }}
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
					tabBarActiveTintColor: "#00EEFF",
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: "#00EEFF" }}>
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

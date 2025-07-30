import { SpecialTabButton } from "@/components/test/SpecialTabButton";
import { WavyHeaderBackground } from "@/components/test/WaveBanner";
import {
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Tabs, useNavigation } from "expo-router";
import React from "react";
import { Platform, Pressable, SafeAreaView, View } from "react-native";

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
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" color={color} size={size} />
					),
					tabBarActiveTintColor: "#00EEFF",
					headerTransparent: true,
					header: () => (
						<SafeAreaView style={{ backgroundColor: "#00EEFF" }}>
							<View
								style={{
									backgroundColor: "#00EEFF",
									height: 80,
									marginTop: 30,
									justifyContent: "center",
								}}
							>
								{/* Menu Icon Positioned on Left */}
								<Pressable
									onPress={() =>
										navigation.dispatch(
											DrawerActions.openDrawer()
										)
									}
									style={{
										position: "absolute",
										top: 10,
										left: 16,
										zIndex: 10,
									}}
								>
									<Ionicons
										name="menu"
										size={35}
										color="black"
									/>
								</Pressable>

								<WavyHeaderBackground />
							</View>
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
							<View
								style={{
									backgroundColor: "#00EEFF",
									height: 80,
									marginTop: 30,
									justifyContent: "center",
								}}
							>
								{/* Menu Icon Positioned on Left */}
								<Pressable
									onPress={() =>
										navigation.dispatch(
											DrawerActions.openDrawer()
										)
									}
									style={{
										position: "absolute",
										top: 10,
										left: 16,
										zIndex: 10,
									}}
								>
									<Ionicons
										name="menu"
										size={35}
										color="black"
									/>
								</Pressable>

								<WavyHeaderBackground />
							</View>
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
								<View
									style={{
										backgroundColor: "#00EEFF",
										height: 80,
										marginTop: 30,
										justifyContent: "center",
									}}
								>
									{/* Menu Icon Positioned on Left */}
									<Pressable
										onPress={() =>
											navigation.dispatch(
												DrawerActions.openDrawer()
											)
										}
										style={{
											position: "absolute",
											top: 10,
											left: 16,
											zIndex: 10,
										}}
									>
										<Ionicons
											name="menu"
											size={35}
											color="black"
										/>
									</Pressable>

									<WavyHeaderBackground />
								</View>
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
							<View
								style={{
									backgroundColor: "#00EEFF",
									height: 80,
									marginTop: 30,
									justifyContent: "center",
								}}
							>
								{/* Menu Icon Positioned on Left */}
								<Pressable
									onPress={() =>
										navigation.dispatch(
											DrawerActions.openDrawer()
										)
									}
									style={{
										position: "absolute",
										top: 10,
										left: 16,
										zIndex: 10,
									}}
								>
									<Ionicons
										name="menu"
										size={35}
										color="black"
									/>
								</Pressable>

								<WavyHeaderBackground />
							</View>
						</SafeAreaView>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;

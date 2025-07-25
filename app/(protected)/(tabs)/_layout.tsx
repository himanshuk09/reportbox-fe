import { WavyHeaderBackground } from "@/components/test/WaveBanner";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
				tabBarStyle: Platform.select({
					ios: {
						backgroundColor: "#343232", // ✅ Tab bar background color
						position: "absolute",
						borderTopWidth: 0, // ✅ Remove top line
						shadowOpacity: 0, // ✅ Remove shadow
					},
					default: {
						backgroundColor: "#343232", // ✅ Tab bar background color
						padding: 10,
						marginBottom: 5,
						borderTopWidth: 0, // ✅ Remove top line
						elevation: 0, // ✅ Remove Android shadow
						// borderTopLeftRadius: 20, // ✅ Rounded top corners
						// borderTopRightRadius: 20,
						// overflow: "hidden",
					},
				}),
				tabBarIconStyle: {
					marginTop: 8, // ✅ Adds space above the icons
				},
				animation: "none", // Custom animation
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

			{/* <Tabs.Screen
				name="custom"
				options={{
					title: "",
					tabBarLabel: "",
					// tabBarIcon: ({ color, size }) => (
					// 	<AntDesign
					// 		name="plussquare"
					// 		color={color}
					// 		size={size}
					// 	/>
					// ),
					tabBarButton: SpecialTabButton,
				}}
			/> */}
			<Tabs.Screen
				name="my-complaints"
				options={{
					title: "",
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="settings" color={color} size={size} />
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
			<Tabs.Protected guard={true}>
				<Tabs.Screen
					name="notifications"
					listeners={{
						tabPress: (e) => {
							// e.preventDefault();
							// navigation.dispatch(DrawerActions.openDrawer());
							// route.push("/");
							console.log("Tab pressed");
						},

						tabLongPress: () => {
							console.log("Tab long pressed");
						},
					}}
					options={{
						title: "",
						headerShown: true,
						tabBarIcon: ({ color, size }) => (
							<Ionicons name="person" color={color} size={size} />
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
		</Tabs>
	);
};

export default TabLayout;

import { WavyHeaderBackground } from "@/components/test/WaveBanner";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Stack, useNavigation } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

const ProtectedLayout = () => {
	const navigation = useNavigation();
	return (
		<Stack>
			<Stack.Screen
				name="help"
				options={({ route }) => ({
					headerShown: true,
					tabBarActiveTintColor: "#00EEFF",
					headerTransparent: true,
					title: "Help",
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
								<Pressable
									onPress={() =>
										navigation.dispatch(
											DrawerActions.openDrawer()
										)
									}
									style={{
										position: "absolute",
										top: 20,
										left: 20,
										zIndex: 10,
										flex: 1,
										flexDirection: "row",
									}}
								>
									<Ionicons
										name="chevron-back"
										size={30}
										color="#343232"
									/>
									<Text
										style={{
											fontSize: 22,
											fontWeight: "bold",
											color: "#343232", // White text
											// marginBottom: 20,
										}}
									>
										Help
									</Text>
								</Pressable>

								<WavyHeaderBackground />
							</View>
						</SafeAreaView>
					),
				})}
			/>
		</Stack>
	);
};

export default ProtectedLayout;

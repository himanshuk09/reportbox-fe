import { WavyHeaderBackground } from "@/components/test/WaveBanner";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Stack, useNavigation } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, View } from "react-native";

const ProtectedLayout = () => {
	const navigation = useNavigation();
	return (
		<Stack>
			<Stack.Screen
				name="[id]"
				options={({ route }) => ({
					headerShown: true,
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
				})}
			/>
		</Stack>
	);
};

export default ProtectedLayout;

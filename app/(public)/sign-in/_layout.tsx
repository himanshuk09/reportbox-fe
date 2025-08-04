import { Stack } from "expo-router";
import React from "react";

const SignINayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="verify-otp"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="verified"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="profile-form"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
		</Stack>
	);
};

export default SignINayout;

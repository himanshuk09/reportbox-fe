import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="welcome"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="sign-in"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>

			{/* <Stack.Screen
				name="verify-otp"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="verified"
				options={({ route }) => ({
					headerShown: true,
				})}
			/>
			<Stack.Screen
				name="profile-form"
				options={({ route }) => ({
					headerShown: false,
				})}
			/> */}
		</Stack>
	);
};

export default AuthLayout;

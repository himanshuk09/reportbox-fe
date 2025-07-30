import { Slot, Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
	return 	<Stack>
			<Stack.Screen
				name="sign-in"
				options={({ route }) => ({
					headerShown: false,
					
				})}
			/>
			<Stack.Screen
				name="forgot-pin"
				options={({ route }) => ({
					headerShown: false,		
				})}
			/>
			<Stack.Screen
				name="welcome"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="sign-up"
				options={({ route }) => ({
					headerShown: false,
				})}
			/>
		</Stack>;
};

export default AuthLayout;

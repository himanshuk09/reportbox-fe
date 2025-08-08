import { useAppTheme } from "@/hooks/useAppTheme"; // or your theme hook
import { BlurView } from "expo-blur";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
export const FullScreenLoader = () => {
	const { primaryColor, secondaryColor } = useAppTheme();

	return (
		<BlurView
			intensity={50}
			style={[
				StyleSheet.absoluteFill,
				{
					zIndex: 999,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "rgba(0, 0, 0, 0.4)",
				},
			]}
		>
			<ActivityIndicator size={60} color={primaryColor} />
		</BlurView>
	);
};

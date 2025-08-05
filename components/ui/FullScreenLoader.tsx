import { useAppTheme } from "@/hooks/useAppTheme"; // or your theme hook
import { BlurView } from "expo-blur";
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
					// backgroundColor: "rgba(0, 0, 0, 0.2)",
				},
			]}
		>
			<ActivityIndicator size="large" color={primaryColor} />
		</BlurView>
	);
};

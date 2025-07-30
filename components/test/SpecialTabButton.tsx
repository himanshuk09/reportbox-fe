import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const SpecialTabButton = () => {
	const handlePress = () => {
		router.push("/(protected)/complaints")
		// Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.9}
			style={styles.button}
		>
			<View style={styles.innerCircle}>
				<AntDesign name="plus" size={30} color="#fff" />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		top: -20,
		justifyContent: "center",
		alignItems: "center",
	},
	innerCircle: {
		width: 50,
		height: 50,
		borderRadius: 35,
		backgroundColor: "#00EEFF", // purple
		justifyContent: "center",
		alignItems: "center",
		elevation: 8,
		shadowColor: "#00EEFF",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.25,
		shadowRadius: 5,
	},
});

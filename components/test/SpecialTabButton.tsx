import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { StyleSheet, TouchableOpacity } from "react-native";

export const SpecialTabButton = () => {
	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		// Alert.alert("Special Tab Button");
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={styles.button}
			activeOpacity={0.85}
		>
			{/* <Ionicons name="add-circle" size={30} color="#fff" /> */}
			<AntDesign name="plussquare" size={24} color="#eee" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		position: "absolute",
		top: -30,
		left: "50%", // ✅ Position from center
		transform: [{ translateX: -20 }],
		backgroundColor: "#00EEFF",
		borderRadius: 5,
		width: 40,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
	},
});

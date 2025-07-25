// import { AntDesign } from "@expo/vector-icons";
// import * as Haptics from "expo-haptics";
// import { StyleSheet, TouchableOpacity } from "react-native";

// export const SpecialTabButton = () => {
// 	const handlePress = () => {
// 		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
// 		// Alert.alert("Special Tab Button");
// 	};

// 	return (
// 		<TouchableOpacity
// 			onPress={handlePress}
// 			style={styles.button}
// 			activeOpacity={0.85}
// 		>
// 			{/* <Ionicons name="add-circle" size={30} color="#fff" /> */}
// 			<AntDesign name="plussquare" size={24} color="#eee" />
// 		</TouchableOpacity>
// 	);
// };

// const styles = StyleSheet.create({
// 	button: {
// 		position: "absolute",
// 		top: -30,
// 		left: "50%", // ✅ Position from center
// 		transform: [{ translateX: -20 }],
// 		backgroundColor: "#00EEFF",
// 		borderRadius: 5,
// 		width: 40,
// 		height: 50,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
// 	},
// });
// components/SpecialTabButton.tsx
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const SpecialTabButton = () => {
	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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

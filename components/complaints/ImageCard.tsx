import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { handleImageChoice } from "@/components/native/CameraScreen";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";

const ImageCard = ({ image, setShowCamera, setImage }: any) => {
	return (
		<View style={{ flex: 1, paddingBottom: 20 }}>
			<Text style={styles.title}>Raise a Complaint:</Text>
			<View style={{ position: "relative", marginTop: 10 }}>
				{image ? (
					<Image
						source={{ uri: image }}
						style={{
							height: 200,
							width: "100%",
							borderRadius: 15,
						}}
						resizeMode="cover"
					/>
				) : (
					<View
						style={{
							height: 200,
							borderRadius: 30,
							backgroundColor: "#1e1e1e",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<FontAwesome5 name="images" size={60} color="#ccc" />
					</View>
				)}

				{/* Camera icon at the bottom center */}
				<View
					style={{
						position: "absolute",
						bottom: -19,
						left: "48%",
						transform: [{ translateX: -15 }],
						backgroundColor: "#ccc",
						borderRadius: 30,
						padding: 10,
						elevation: 5, // shadow on Android
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.25,
						shadowRadius: 3.84,
					}}
				>
					<Fontisto
						name="camera"
						size={23}
						color="#000"
						onPress={() =>
							handleImageChoice(setShowCamera, setImage)
						}
					/>
				</View>
			</View>
		</View>
	);
};

export default ImageCard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#343232",
		paddingHorizontal: 6,
		paddingVertical: 6,
		paddingTop: 120,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#fff", // White text
		marginBottom: 20,
	},
});

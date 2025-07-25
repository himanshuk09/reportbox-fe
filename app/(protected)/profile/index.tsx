import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileFormScreen() {
	const route = useRouter();
	const [image, setImage] = useState<string | null | any>(null);
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images", "videos"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		console.log(result);
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#343232" }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					contentContainerStyle={styles.container}
					keyboardShouldPersistTaps="handled"
				>
					{/* Background Header */}
					<ImageBackground
						source={{
							uri: "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
						}}
						style={styles.headerBg}
						resizeMode="cover"
					>
						<View style={styles.profilePicWrapper}>
							<View style={styles.profilePic}>
								<Image
									source={{
										uri: image
											? image
											: "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
									}}
									resizeMode="center"
									style={{
										width: "100%",
										height: "100%",
										borderRadius: 40,
									}}
								/>
							</View>
							<TouchableOpacity
								style={styles.addIcon}
								onPress={pickImage}
							>
								<Ionicons
									name="add"
									size={16}
									color="#00EEFF"
								/>
							</TouchableOpacity>
						</View>
					</ImageBackground>

					{/* Form */}
					<View style={styles.form}>
						<Text style={styles.label}>User Name</Text>
						<TextInput
							placeholder="Enter your name"
							placeholderTextColor="#aaa"
							style={styles.input}
						/>

						<Text style={styles.label}>Address</Text>

						<View style={styles.row}>
							<View
								style={[
									styles.inputContainer,
									{ flex: 1, marginRight: 8 },
								]}
							>
								<Text style={[styles.label, { fontSize: 12 }]}>
									State
								</Text>
								<TextInput
									placeholder="Enter your state"
									placeholderTextColor="#aaa"
									style={styles.input}
								/>
							</View>
							<View style={[styles.inputContainer, { flex: 1 }]}>
								<Text style={[styles.label, { fontSize: 12 }]}>
									City
								</Text>
								<TextInput
									placeholder="Enter your city"
									placeholderTextColor="#aaa"
									style={styles.input}
								/>
							</View>
						</View>
						<Text style={[styles.label, { fontSize: 12 }]}>
							Door no.
						</Text>
						<TextInput
							placeholder="Enter door no."
							placeholderTextColor="#aaa"
							style={styles.input}
						/>
						<Text style={[styles.label, { fontSize: 12 }]}>
							Stree name
						</Text>
						<TextInput
							placeholder="Enter your street"
							placeholderTextColor="#aaa"
							style={styles.input}
						/>

						<TouchableOpacity
							style={styles.button}
							onPress={() => route.replace("/")}
						>
							<Text style={styles.buttonText}>Continue</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 40,
	},
	headerBg: {
		width: "100%",
		height: 150,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: 0,
	},
	profilePicWrapper: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: -40, // pull it down over form
		zIndex: 100,
	},
	profilePic: {
		width: 80,
		height: 80,
		// backgroundColor: "#fff",
		borderRadius: 40,
		borderWidth: 2,
		borderColor: "#00EEFF",
	},
	addIcon: {
		position: "absolute",
		right: -2,
		bottom: 0,
		backgroundColor: "#fff",
		borderRadius: 12,
		width: 24,
		height: 24,
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#00EEFF",
		borderWidth: 2,
	},
	form: {
		backgroundColor: "#343232",
		paddingHorizontal: 20,
		paddingTop: 50,
		flex: 1,
	},
	label: {
		color: "#fff",
		fontSize: 14,
		marginBottom: 8,
		marginTop: 12,
	},
	input: {
		backgroundColor: "#2c2c2c",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 12,
		color: "#fff",
		marginBottom: 12,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	inputContainer: {
		marginBottom: 12,
	},
	button: {
		backgroundColor: "#00EEFF",
		borderRadius: 999,
		paddingVertical: 14,
		alignItems: "center",
		marginVertical: 20,
	},
	buttonText: {
		color: "#000",
		fontSize: 16,
		fontWeight: "bold",
	},
});

import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileFormScreen() {
	const [edit, setEdit] = useState(false);
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
						<Pressable
							style={{
								position: "absolute",
								top: 10,
								right: 16,
								zIndex: 10,
							}}
							onPress={() => setEdit(!edit)}
						>
							<MaterialIcons
								name="edit"
								size={24}
								color="##43232"
							/>
						</Pressable>

						<View style={styles.profilePicWrapper}>
							<View style={styles.profilePic}>
								<Image
									source={{
										uri: "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
									}}
									resizeMode="center"
									style={{
										width: "100%",
										height: "100%",
										borderRadius: 40,
									}}
								/>
							</View>
							<TouchableOpacity style={styles.addIcon}>
								<Ionicons
									name="add"
									size={16}
									color="#00EEFF"
								/>
							</TouchableOpacity>
						</View>
					</ImageBackground>
					{!edit ? (
						<>
							<View style={styles.userIdContainer}>
								<Text style={[styles.label, { fontSize: 18 }]}>
									This is Your User ID
								</Text>

								<View style={styles.userIdBox}>
									<Text style={styles.userIdText}>
										MTNHB30
									</Text>
								</View>
							</View>

							<View style={styles.addressContainer}>
								<Text style={styles.addressText}>Rishi</Text>
								<Text style={styles.addressText}>
									Villapuram Housing Board, 5008
								</Text>
								<Text style={styles.addressText}>
									Madurai 625011
								</Text>
								<Text style={styles.addressText}>
									Tamil Nadu
								</Text>
							</View>

							<TouchableOpacity
								style={[
									styles.button,
									{ marginHorizontal: 10 },
								]}
							>
								<Text style={styles.buttonText}>Done</Text>
							</TouchableOpacity>
						</>
					) : (
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
									<Text
										style={[styles.label, { fontSize: 12 }]}
									>
										State
									</Text>
									<TextInput
										placeholder="Enter your state"
										placeholderTextColor="#aaa"
										style={styles.input}
									/>
								</View>
								<View
									style={[styles.inputContainer, { flex: 1 }]}
								>
									<Text
										style={[styles.label, { fontSize: 12 }]}
									>
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

							<TouchableOpacity style={styles.button}>
								<Text style={styles.buttonText}>Continue</Text>
							</TouchableOpacity>
						</View>
					)}
					<TouchableOpacity
						style={[
							styles.helpButton, // Using StyleSheet for better performance
							{
								position: "absolute",
								right: 20,
								bottom: 0,
								width: 40, // Add fixed dimensions
								height: 40, // for better touch area
								justifyContent: "center",
								alignItems: "center",
							},
						]}
						onPress={() =>
							router.push("/(protected)/settings/help")
						}
					>
						<Entypo
							name="help-with-circle"
							size={30}
							color="#00EEFF"
						/>
					</TouchableOpacity>
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
		width: 90,
		height: 90,
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

	userIdContainer: {
		alignItems: "center",
		marginVertical: 40,
	},

	userIdBox: {
		borderColor: "#00EEFF",
		borderWidth: 1,
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 6,
	},
	userIdText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	addressContainer: {
		alignItems: "flex-start",
		gap: 4,
		margin: 30,
	},
	addressText: {
		color: "#fff",
		fontSize: 18,
	},
	helpButton: {
		position: "absolute",
		right: 20,
		bottom: 40,
		width: 40,
		height: 40,
		borderRadius: 20, // Circular button
		backgroundColor: "white", // Optional background
		justifyContent: "center",
		alignItems: "center",
		elevation: 3, // Android shadow
		shadowColor: "#000", // iOS shadow
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
});

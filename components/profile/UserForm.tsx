import { users } from "@/constants/posts";
import { useAuth } from "@/contexts/AuthContext";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
	Alert,
	Dimensions,
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Modal,
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
import CameraScreen, { handleImageChoice } from "../native/CameraScreen";

interface UserFormProps {
	editable?: boolean;
	onlyForm?: boolean;
	onPressContinue?: any;
}
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const UserForm = ({
	editable = true,
	onlyForm = false,
	onPressContinue = () => {},
}: UserFormProps) => {
	const [edit, setEdit] = useState(onlyForm);
	const [showCamera, setShowCamera] = useState(false);
	const [formChanged, setFormChanged] = useState(false);
	const [formData, setFormData] = useState<any>(users[0]);
	const [showImageViewer, setShowImageViewer] = useState(false);
	const [currentImageUri, setCurrentImageUri] = useState("");
	const { verifyOtp, session, user, completeProfile } = useAuth();
	const openImageViewer = (uri: string) => {
		setCurrentImageUri(uri);
		setShowImageViewer(true);
	};
	// Function to close the image viewer
	const closeImageViewer = () => {
		setShowImageViewer(false);
		setCurrentImageUri("");
	};
	const handleSetImage = (newAvtar: string) => {
		setFormData((prev: any) => ({
			...prev,
			avtar: newAvtar,
		}));
	};
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#343232" }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
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
						{editable && !onlyForm && (
							<Pressable
								style={{
									position: "absolute",
									top: 10,
									right: 16,
									zIndex: 10,
								}}
								onPress={() => {
									if (formChanged) {
										Alert.alert(
											"Unsaved Changes",
											"You have unsaved changes. What would you like to do?",
											[
												{
													text: "Discard Changes",
													onPress: () => {
														setEdit(false);
														setFormChanged(false);
														// Optionally reset formData here
													},
													style: "destructive",
												},
												{
													text: "Continue Editing",
													style: "cancel",
												},
											]
										);
									} else {
										setEdit(!edit);
									}
								}}
							>
								<MaterialIcons
									name="edit"
									size={24}
									color="#FFF"
								/>
							</Pressable>
						)}

						<View style={styles.profilePicWrapper}>
							<TouchableOpacity
								style={styles.profilePic}
								onPress={() => openImageViewer(formData.avtar)}
							>
								<Image
									source={{
										uri: formData.avtar,
									}}
									resizeMode="cover"
									style={{
										width: "100%",
										height: "100%",
										borderRadius: 40,
									}}
								/>
							</TouchableOpacity>
							{(edit || onlyForm) && (
								<TouchableOpacity
									style={styles.addIcon}
									onPress={() =>
										handleImageChoice(
											setShowCamera,
											handleSetImage
										)
									}
								>
									<Ionicons
										name="add"
										size={16}
										color="#00EEFF"
									/>
								</TouchableOpacity>
							)}
						</View>
					</ImageBackground>
					{edit || onlyForm ? (
						<>
							<View style={styles.form}>
								<Text style={styles.label}>User Name</Text>
								<TextInput
									placeholder="Enter your name"
									placeholderTextColor="#aaa"
									style={styles.input}
									value={formData.name}
									onChangeText={(text) => {
										setFormData((prev: any) => ({
											...prev,
											name: text,
										}));
										setFormChanged(true);
									}}
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
											style={[
												styles.label,
												{ fontSize: 12 },
											]}
										>
											State
										</Text>
										<TextInput
											placeholder="Enter your state"
											placeholderTextColor="#aaa"
											style={styles.input}
											value={formData.state}
											onChangeText={(text) => {
												setFormData((prev: any) => ({
													...prev,
													state: text,
												}));
												setFormChanged(true);
											}}
										/>
									</View>
									<View
										style={[
											styles.inputContainer,
											{ flex: 1 },
										]}
									>
										<Text
											style={[
												styles.label,
												{ fontSize: 12 },
											]}
										>
											City
										</Text>
										<TextInput
											placeholder="Enter your city"
											placeholderTextColor="#aaa"
											style={styles.input}
											value={formData.city}
											onChangeText={(text) => {
												setFormData((prev: any) => ({
													...prev,
													city: text,
												}));
												setFormChanged(true);
											}}
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
									value={formData.doorNo}
									onChangeText={(text) => {
										setFormData((prev: any) => ({
											...prev,
											doorNo: text,
										}));
										setFormChanged(true);
									}}
								/>
								<Text style={[styles.label, { fontSize: 12 }]}>
									Stree name
								</Text>
								<TextInput
									placeholder="Enter your street"
									placeholderTextColor="#aaa"
									style={styles.input}
									value={formData.street}
									onChangeText={(text) => {
										setFormData((prev: any) => ({
											...prev,
											street: text,
										}));
										setFormChanged(true);
									}}
								/>

								<TouchableOpacity
									style={styles.button}
									onPress={() => {
										Alert.alert(
											"Save Changes?",
											"Do you want to save the changes?",
											[
												{
													text: "Cancel",
													style: "cancel",
												},
												{
													text: "Save",
													onPress: () => {
														setEdit(false);
														setFormChanged(false);
														completeProfile(
															formData
														);
														onPressContinue();
													},
												},
											]
										);
									}}
								>
									<Text style={styles.buttonText}>
										Continue
									</Text>
								</TouchableOpacity>
							</View>
						</>
					) : (
						<View
							style={[
								styles.form,
								{ paddingTop: 0, paddingBottom: 30 },
							]}
						>
							<View style={styles.userIdContainer}>
								<Text style={[styles.label, { fontSize: 18 }]}>
									This is Your User ID
								</Text>

								<View style={styles.userIdBox}>
									<Text style={styles.userIdText}>
										{formData.userID}
									</Text>
								</View>
							</View>

							<View style={styles.addressContainer}>
								<Text style={styles.addressText}>
									{formData.name}
								</Text>
								<Text style={styles.addressText}>
									{formData.street}, {formData.doorNo}
								</Text>
								<Text style={styles.addressText}>
									{formData.city}
								</Text>
								<Text style={styles.addressText}>
									{formData.state}
								</Text>
							</View>

							{/* <TouchableOpacity
								style={[
									styles.button,
									{ marginHorizontal: 10 },
								]}
							>
								<Text style={styles.buttonText}>Done</Text>
							</TouchableOpacity> */}
						</View>
					)}
					{!edit && !onlyForm && (
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
									transform: [{ rotate: "20deg" }],
								},
							]}
							onPress={() =>
								router.push("/(protected)/settings/help")
							}
						>
							<Entypo
								name="help-with-circle"
								size={35}
								color="#00EEFF"
							/>
						</TouchableOpacity>
					)}
				</ScrollView>
				<Modal
					visible={showCamera}
					animationType="fade"
					presentationStyle="fullScreen"
				>
					<CameraScreen
						setShowCamera={setShowCamera}
						setImage={handleSetImage}
					/>
				</Modal>
				{/* Image Viewer Modal */}
				<Modal
					visible={showImageViewer}
					transparent={true} // Makes the background translucent
					onRequestClose={closeImageViewer} // For Android back button
					animationType="fade"
				>
					<View style={styles.imageViewerContainer}>
						<Image
							source={{ uri: currentImageUri }}
							style={styles.fullScreenImage}
							resizeMode="contain" // Use 'contain' to ensure the whole image is visible
						/>
						<TouchableOpacity
							style={styles.closeButton}
							onPress={closeImageViewer}
						>
							<Ionicons
								name="close-circle"
								size={40}
								color="white"
							/>
						</TouchableOpacity>
					</View>
				</Modal>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default UserForm;

const styles = StyleSheet.create({
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
		borderRadius: 45,
		borderWidth: 3,
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
	text: {
		color: "#fff",
		fontSize: 16,
	},
	imageViewerContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.9)",
		justifyContent: "center",
		alignItems: "center",
	},
	fullScreenImage: {
		width: screenWidth * 0.9,
		height: screenHeight * 0.8,
	},
	closeButton: {
		position: "absolute",
		top: 50,
		right: 20,
		zIndex: 1,
		padding: 10,
	},
});

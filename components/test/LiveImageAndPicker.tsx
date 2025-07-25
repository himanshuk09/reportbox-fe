// import { FontAwesome6 } from "@expo/vector-icons";
// import { Camera, CameraType, CameraView } from "expo-camera";
// import * as ImagePicker from "expo-image-picker";
// import React, { useRef, useState } from "react";
// import {
// 	Alert,
// 	Button,
// 	Image,
// 	StyleSheet,
// 	Text,
// 	TouchableOpacity,
// 	View,
// } from "react-native";
// export default function ImagePickerCameraScreen() {
// 	const [imageUri, setImageUri] = useState<string | null>(null);
// 	const [showCamera, setShowCamera] = useState(false);
// 	const [cameraType, setCameraType] = useState<CameraType>("back");
// 	const cameraRef = useRef<any>(null);

// 	// Ask permissions for camera and media library
// 	const requestPermissions = async () => {
// 		const cameraStatus = await Camera.requestCameraPermissionsAsync();
// 		const mediaStatus =
// 			await ImagePicker.requestMediaLibraryPermissionsAsync();

// 		if (!cameraStatus.granted || !mediaStatus.granted) {
// 			Alert.alert(
// 				"Permission required",
// 				"Camera and gallery access is needed."
// 			);
// 			return false;
// 		}
// 		return true;
// 	};

// 	// Handle Action Sheet Selection
// 	const handleImageChoice = async () => {
// 		const granted = await requestPermissions();
// 		if (!granted) return;

// 		Alert.alert("Choose Image", "Select source", [
// 			{ text: "Camera", onPress: () => setShowCamera(true) },
// 			{ text: "Gallery", onPress: pickImageFromGallery },
// 			{ text: "Cancel", style: "cancel" },
// 		]);
// 	};

// 	// Open gallery
// 	const pickImageFromGallery = async () => {
// 		const result = await ImagePicker.launchImageLibraryAsync({
// 			mediaTypes: ["images"],
// 			allowsEditing: true,
// 			aspect: [4, 3],
// 			quality: 1,
// 		});

// 		if (!result.canceled) {
// 			setImageUri(result.assets[0].uri);
// 		}
// 	};

// 	// Capture image from camera
// 	const takePicture = async () => {
// 		if (cameraRef.current) {
// 			const photo = await cameraRef.current.takePictureAsync();
// 			setImageUri(photo.uri);
// 			setShowCamera(false);
// 		}
// 	};

// 	const flipCamera = () => {
// 		setCameraType((prev) => (prev === "back" ? "front" : "back"));
// 	};

// 	if (showCamera) {
// 		return (
// 			<View style={{ flex: 1 }}>
// 				<CameraView
// 					ref={cameraRef}
// 					style={StyleSheet.absoluteFill}
// 					facing={cameraType}
// 				/>
// 				<View style={styles.cameraControls}>
// 					<TouchableOpacity
// 						style={styles.button}
// 						onPress={flipCamera}
// 					>
// 						<Text style={styles.text}>Flip</Text>
// 					</TouchableOpacity>
// 					<TouchableOpacity
// 						style={styles.button}
// 						onPress={takePicture}
// 					>
// 						<Text style={styles.text}>Capture</Text>
// 					</TouchableOpacity>
// 					<TouchableOpacity
// 						style={[styles.button, { backgroundColor: "gray" }]}
// 						onPress={() => setShowCamera(false)}
// 					>
// 						<Text style={styles.text}>Cancel</Text>
// 					</TouchableOpacity>
// 				</View>
// 			</View>
// 		);
// 	}

// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.imageBlock}>
// 				{imageUri ? (
// 					<Image source={{ uri: imageUri }} style={styles.image} />
// 				) : (
// 					<FontAwesome6 name="images" size={60} color="white" />
// 				)}
// 			</View>
// 			<Button title="Choose Image" onPress={handleImageChoice} />
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		padding: 20,
// 	},
// 	imagePreview: {
// 		marginTop: 20,
// 		width: 250,
// 		height: 250,
// 		borderRadius: 10,
// 	},
// 	camera: {
// 		flex: 1,
// 	},
// 	cameraControls: {
// 		position: "absolute",
// 		bottom: 30,
// 		flexDirection: "row",
// 		width: "100%",
// 		justifyContent: "space-evenly",
// 	},
// 	button: {
// 		backgroundColor: "rgba(0,0,0,0.6)",
// 		padding: 10,
// 		borderRadius: 8,
// 	},
// 	text: {
// 		color: "#fff",
// 		fontSize: 16,
// 	},
// 	imageBlock: {
// 		width: 200,
// 		height: 200,
// 		borderWidth: 1,
// 		borderColor: "#ccc",
// 		backgroundColor: "#343232",
// 		borderRadius: 10,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		marginBottom: 10,
// 	},
// 	image: {
// 		width: "100%",
// 		height: "100%",
// 		borderRadius: 10,
// 	},
// });

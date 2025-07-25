// import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
// import { useRef, useState } from "react";
// import {
// 	Button,
// 	Image,
// 	StyleSheet,
// 	Text,
// 	TouchableOpacity,
// 	View,
// } from "react-native";

// export default function App() {
// 	const [facing, setFacing] = useState<CameraType>("back");
// 	const [permission, requestPermission] = useCameraPermissions();
// 	const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

// 	const cameraRef = useRef<any>(null); // Ref to control the camera

// 	if (!permission) {
// 		return <View />;
// 	}

// 	if (!permission.granted) {
// 		return (
// 			<View style={styles.container}>
// 				<Text style={styles.message}>
// 					We need your permission to show the camera
// 				</Text>
// 				<Button onPress={requestPermission} title="Grant permission" />
// 			</View>
// 		);
// 	}

// 	function toggleCameraFacing() {
// 		setFacing((current) => (current === "back" ? "front" : "back"));
// 	}

// 	const takePicture = async () => {
// 		if (cameraRef.current) {
// 			const photo = await cameraRef.current.takePictureAsync();
// 			setCapturedPhoto(photo.uri);
// 			console.log("Captured photo URI:", photo.uri);
// 		}
// 	};

// 	return (
// 		<View style={styles.container}>
// 			<CameraView ref={cameraRef} style={styles.camera} facing={facing}>
// 				<View style={styles.buttonContainer}>
// 					<TouchableOpacity
// 						style={styles.button}
// 						onPress={toggleCameraFacing}
// 					>
// 						<Text style={styles.text}>Flip Camera</Text>
// 					</TouchableOpacity>
// 					<TouchableOpacity
// 						style={styles.button}
// 						onPress={takePicture}
// 					>
// 						<Text style={styles.text}>Take Picture</Text>
// 					</TouchableOpacity>
// 				</View>
// 			</CameraView>

// 			{capturedPhoto && (
// 				<View style={styles.preview}>
// 					<Text style={styles.previewText}>Captured Image:</Text>
// 					<Image
// 						source={{ uri: capturedPhoto }}
// 						style={styles.image}
// 					/>
// 				</View>
// 			)}
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// 	camera: {
// 		flex: 1,
// 	},
// 	buttonContainer: {
// 		flexDirection: "row",
// 		justifyContent: "space-around",
// 		position: "absolute",
// 		bottom: 30,
// 		width: "100%",
// 	},
// 	button: {
// 		backgroundColor: "rgba(0,0,0,0.5)",
// 		padding: 10,
// 		borderRadius: 5,
// 	},
// 	text: {
// 		color: "#fff",
// 		fontSize: 16,
// 	},
// 	message: {
// 		textAlign: "center",
// 		margin: 20,
// 	},
// 	preview: {
// 		alignItems: "center",
// 		padding: 10,
// 	},
// 	previewText: {
// 		marginVertical: 10,
// 		fontSize: 16,
// 	},
// 	image: {
// 		width: 200,
// 		height: 300,
// 		borderRadius: 10,
// 	},
// });

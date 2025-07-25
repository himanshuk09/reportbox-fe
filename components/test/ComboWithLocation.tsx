import { FontAwesome6 } from "@expo/vector-icons";
import { Camera, CameraType, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
	Alert,
	Button,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
const { width } = Dimensions.get("window");
export default function ImagePickerCameraScreen() {
	const [imageUri, setImageUri] = useState<string | null>(null);
	const [showCamera, setShowCamera] = useState(false);
	const [cameraType, setCameraType] = useState<CameraType>("back");
	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
		address: string;
	} | null>(null);
	const [fullLocation, SetFullLocation] =
		useState<Location.LocationObjectCoords | null>(null);
	const [address, setAddress] = useState<string>("");
	const cameraRef = useRef<any>(null);

	// Ask permissions for camera, media and location
	const requestPermissions = async () => {
		const { status: cameraStatus } =
			await Camera.requestCameraPermissionsAsync();
		const { status: mediaStatus } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		const { status: locationStatus } =
			await Location.requestForegroundPermissionsAsync();

		if (
			cameraStatus !== "granted" ||
			mediaStatus !== "granted" ||
			locationStatus !== "granted"
		) {
			Alert.alert(
				"Permission required",
				"Camera, gallery, and location access is needed."
			);
			return false;
		}
		return true;
	};

	// Handle Action Sheet Selection
	const handleImageChoice = async () => {
		const granted = await requestPermissions();
		if (!granted) return;

		Alert.alert("Choose Image", "Select source", [
			{ text: "Camera", onPress: () => setShowCamera(true) },
			{ text: "Gallery", onPress: pickImageFromGallery },
			{ text: "Cancel", style: "cancel" },
		]);
	};

	// Open gallery
	const pickImageFromGallery = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);
			// await getLocationData();
		}
	};

	// Capture image from camera
	const takePicture = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();
			setImageUri(photo.uri);
			setShowCamera(false);
			// await getLocationData();
		}
	};

	// Flip camera
	const flipCamera = () => {
		setCameraType((prev) => (prev === "back" ? "front" : "back"));
	};

	// Get current location & reverse geocode
	const getLocationData = async () => {
		try {
			const location = await Location.getCurrentPositionAsync({});
			const coords = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			};

			const addressArray = await Location.reverseGeocodeAsync(coords);
			console.log("addressArray", JSON.stringify(addressArray, null, 2));

			const address = addressArray[0];
			const addressText = `${address.name}, ${address.city}, ${address.region}, ${address.country}`;

			setLocation({
				...coords,
				address: addressText,
			});
		} catch (error) {
			console.log("Error getting location:", error);
			setLocation(null);
		}
	};
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.warn("Permission to access location was denied");
				return;
			}

			let loc: any = await Location.getCurrentPositionAsync({
				accuracy: 5,
			});
			SetFullLocation(loc.coords);

			let geo = await Location.reverseGeocodeAsync(loc.coords);
			if (geo.length > 0) {
				setAddress(
					`${geo[0].name || ""}, ${geo[0].city || ""}, ${
						geo[0].region || ""
					}`
				);
			}
		})();
	}, []);
	// Camera screen
	if (showCamera) {
		return (
			<View style={styles.container}>
				<View style={styles.cameraBox}>
					<CameraView
						ref={cameraRef}
						style={styles.cameraSmall}
						facing={cameraType}
					/>
				</View>
				<View style={styles.cameraControls}>
					<View style={styles.overlayContainer}>
						<View style={styles.overlayCard}>
							<Text style={styles.label}>
								📍 Current Location
							</Text>
							<Text style={styles.value}>
								{address || "Fetching location..."}
							</Text>
							{fullLocation && (
								<Text style={styles.coords}>
									Lat: {fullLocation.latitude.toFixed(5)} |
									Lon: {fullLocation.longitude.toFixed(5)}
								</Text>
							)}
						</View>
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={flipCamera}
					>
						<Text style={styles.text}>Flip</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={takePicture}
					>
						<Text style={styles.text}>Capture</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: "gray" }]}
						onPress={() => setShowCamera(false)}
					>
						<Text style={styles.text}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
	//get location

	return (
		<View style={styles.container}>
			<View style={styles.imageBlock}>
				{imageUri ? (
					<Image source={{ uri: imageUri }} style={styles.image} />
				) : (
					<FontAwesome6 name="images" size={60} color="white" />
				)}
			</View>
			{location && (
				<View style={{ marginVertical: 10, alignItems: "center" }}>
					<Text style={styles.locationText}>
						📍 {location.address}
					</Text>
					<Text style={styles.locationText}>
						Lat: {location.latitude.toFixed(6)} | Lon:{" "}
						{location.longitude.toFixed(6)}
					</Text>
				</View>
			)}
			<Button title="Choose Image" onPress={handleImageChoice} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	cameraControls: {
		position: "absolute",
		bottom: 30,
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
	},

	cameraSmall: {
		width: 300,
		height: 450,
		borderRadius: 12,
		overflow: "hidden",
	},
	cameraBox: {
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		backgroundColor: "rgba(0,0,0,0.6)",
		padding: 10,
		borderRadius: 8,
	},
	text: {
		color: "#fff",
		fontSize: 16,
	},
	imageBlock: {
		width: 200,
		height: 200,
		borderWidth: 1,
		borderColor: "#ccc",
		backgroundColor: "#343232",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
	},
	locationText: {
		color: "#333",
		fontSize: 14,
		textAlign: "center",
	},
	overlayContainer: {
		position: "absolute",
		bottom: 40,
		left: 20,
		right: 20,
		alignItems: "center",
	},
	overlayCard: {
		backgroundColor: "rgba(0,0,0,0.6)",
		padding: 16,
		borderRadius: 12,
		width: width - 40,
		marginBottom: 16,
	},
	label: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	value: {
		color: "#fff",
		fontSize: 14,
	},
	coords: {
		color: "#aaa",
		fontSize: 12,
		marginTop: 4,
	},

	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
});

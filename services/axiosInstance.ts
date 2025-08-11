import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
var id: any;

const api = axios.create({
	baseURL: "http://192.168.19.110:8080/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// 🚫 Block requests when offline
api.interceptors.request.use(
	async (config) => {
		const state = await NetInfo.fetch();

		if (!state.isConnected) {
			// Show toast only if not already shown
			id = Toast.show({
				type: "error",
				text1: "You are offline",
				text2: "Please check your internet connection.",
				autoHide: false,
				swipeable: false,
			});

			return Promise.reject({
				message: "📴 Offline - blocking request",
				isOffline: true,
			});
		}

		return config;
	},
	(error) => Promise.reject(error)
);

NetInfo.addEventListener((state) => {
	if (state.isConnected) {
		Toast.hide(id);
	}
});
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.isOffline) {
			id = Toast.show({
				type: "error",
				text1: "You are offline",
				text2: "Please check your internet connection.",
				autoHide: false,
				swipeable: false,
			});
		} else if (error.response) {
			// Toast.show({
			// 	type: "error",
			// 	text1: "Error",
			// 	text2:
			// 		error.response.data?.message ||
			// 		"Something went wrong on the server.",
			// });
		} else if (error.request) {
			// Toast.show({
			// 	type: "error",
			// 	text1: "No response from server",
			// 	text2: "Please try again later.",
			// });
		} else {
			// Toast.show({
			// 	type: "error",
			// 	text1: "Unexpected error",
			// 	text2: error.message || "An unknown error occurred.",
			// });
		}

		return Promise.reject(error);
	}
);

export default api;

export const uploadImageToCloudinary = async (imageUri: string) => {
	try {
		if (!imageUri) {
			console.log("Image URI is missing.");
		}
		const fileInfo = await FileSystem.getInfoAsync(imageUri);
		if (!fileInfo.exists) {
			console.log("File does not exist at URI: " + imageUri);
		}
		const fileName = imageUri.split("/").pop() || "photo.jpg";
		const fileType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";

		const formData = new FormData();
		formData.append("image", {
			uri: imageUri,
			type: fileType,
			name: fileName,
		} as any);

		const res = await api.post(`/upload`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return res.data;
	} catch (err: any) {
		console.log("Upload failed:", err.message);
		return false;
	}
};

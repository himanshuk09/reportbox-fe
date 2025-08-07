import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import api from "./axiosInstance";

export const raisedComplaint = async (payload: any) => {
	try {
		const { beforeImage } = payload;
		if (
			beforeImage.startsWith("/uploads/complaint/") ||
			beforeImage.startsWith("https://") ||
			beforeImage.startsWith("http://")
		) {
			Toast.show({ type: "error", text1: "Unabled to upload Image" });
			return;
		}
		const response = await api.post("/complaints", payload);
		if (response.data) {
			await uploadRaisedImage(response.data._id, beforeImage);
			console.log(JSON.stringify(response.data, null, 1));
		}
	} catch (error: any) {
		console.log("Error while Raiser complaint", error.message);
	}
};
export const uploadRaisedImage = async (id: string, imageUri: string) => {
	try {
		if (!imageUri) {
			console.log("Image URI is missing.");
			return false;
		}

		const fileInfo = await FileSystem.getInfoAsync(imageUri);
		if (!fileInfo.exists) {
			console.log("File does not exist at URI: " + imageUri);
			return false;
		}

		const fileName = imageUri.split("/").pop() || "photo.jpg";
		const fileType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";

		const formData = new FormData();
		formData.append("beforeImage", {
			uri: imageUri,
			type: fileType,
			name: fileName,
		} as any);

		await api.patch(`/complaints/update/raised-image/${id}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		Toast.show({
			type: "success",
			text1: "Complaint Raised Successfully.",
		});
		return true;
	} catch (err: any) {
		console.log("Upload failed:", err.message);
		Toast.show({
			type: "error",
			text1: "Image Upload failed",
			text2: "COmplaint Rasied please edit and upload Image.",
		});
		return false;
	}
};

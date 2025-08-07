import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import api from "./axiosInstance";

export const sendOtpRToEmail = async ({ email }: { email: string }) => {
	try {
		const res = await api.post("/auth/send-otp", {
			email: email,
		});
		return res?.data?.status;
	} catch (error: any) {
		console.log("Error on sending mail", error.message);
		return false;
	}
};

export const verifySentOtp = async ({
	email,
	otp,
}: {
	email: string;
	otp: string;
}) => {
	try {
		const res = await api.post("/auth/verify-otp", {
			email: email,
			otp: otp,
		});

		return res?.data;
	} catch (error: any) {
		console.log("Error on Verifing OTP", error.message);

		return false;
	}
};

/* ---------------------------------- Users --------------------------------- */

export const getFullDetails = async (id: string) => {
	try {
		const res = await api.get(`/users/full-info/${id}`);
		return res?.data;
	} catch (error: any) {
		console.log("Error on Getting full details:", error.message);

		return false;
	}
};
export const uploadImageWithData = async (
	id: string,
	data: any,
	imageUri: string
) => {
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

		// Build FormData
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]: any) => {
			formData.append(key, value);
		});
		formData.append("avatar", {
			uri: imageUri,
			type: fileType,
			name: fileName,
		} as any);

		const response = await api.patch(`/users/update/${id}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		Toast.show({ type: "success", text1: "Profile updated successfully." });
		return true;
	} catch (err: any) {
		console.log("Upload failed:", err.message);
		Toast.show({ type: "error", text1: err.message || "Upload failed." });
		return false;
	}
};
export const updatedUserDetails = async (id: string, data: any) => {
	try {
		const response = await api.patch(`/users/update/${id}`, data);
		return response.data;
	} catch (err: any) {
		return false;
	}
};
export const updateProfile = async (
	id: string,
	data: any,
	imageUri: string
) => {
	try {
		await updatedUserDetails(id, data);
		if (
			!imageUri.startsWith("/uploads/user/") ||
			!imageUri.startsWith("https://") ||
			!imageUri.startsWith("http://")
		) {
			await uploadImage(id, imageUri);
		}
		Toast.show({ type: "success", text1: "Profile updated successfully." });
		return true;
	} catch (error) {
		Toast.show({ type: "error", text1: "Updated failed." });
		return false;
	}
};
export const uploadImage = async (id: string, imageUri: string) => {
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
		formData.append("avatar", {
			uri: imageUri,
			type: fileType,
			name: fileName,
		} as any);

		await api.patch(`/users/update/avatar/${id}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return true;
	} catch (err: any) {
		console.log("Upload failed:", err.message);
		return false;
	}
};
/* -------------------------------------------------------------------------- */

import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import api, { uploadImageToCloudinary } from "./axiosInstance";

export const raisedComplaint = async (payload: any) => {
	try {
		const { beforeImage } = payload;
		const shouldUploadImage = beforeImage?.startsWith("file://");
		if (shouldUploadImage) {
			const response = await uploadImageToCloudinary(beforeImage);
			if (response?.data) {
				const complaint: any = await api.post("/complaints", {
					...payload,
					beforeImage: response.data.url,
					beforeImage_public_id: response.data.public_id,
				});
				Toast.show({
					type: "success",
					text1: "Complaint Raised Successfully.",
				});

				return {
					success: true,
					complaint: complaint?.data,
				};
			} else {
				Toast.show({
					type: "error",
					text1: "Image upload failed",
				});
				return false;
			}
		}
	} catch (error: any) {
		console.log("Error while Raiser complaint", error.message);
		return {
			success: false,
		};
	}
};
export const getAllComplaints = async () => {
	try {
		const response = await api.get("/complaints/");
		return response.data;
	} catch (error) {
		console.log("Error on Get All Complaints");
	}
};

export const getComplaintsByID = async (id: string) => {
	try {
		const response = await api.get(`/complaints/${id}`);
		return response.data;
	} catch (error) {
		console.log("Error on Get Complaints by ID");
	}
};
export const getComplaintsByUserID = async (userId: string) => {
	try {
		const response = await api.get(`/complaints/user/${userId}`);
		return response.data.data;
	} catch (error) {
		console.log("Error on Get Complaints by USER ID");
	}
};
export const updateComplaintStatus = async (
	id: string,
	status: string,
	assignedTo?: string
) => {
	try {
		const response = await api.patch(`/complaints/${id}/status`, {
			status,
			assignedTo,
		});
		return response.data;
	} catch (error) {
		console.log("Error on update Complaint Status");
	}
};
export const updateComplaintByID = async (id: string, data: any) => {
	try {
		const response = await api.patch(`/complaints/${id}`, data);
		return response.data;
	} catch (error: any) {
		console.log("Error on update Complaint ", error.message);
	}
};
export const deleteComplaintByID = async (id: string) => {
	try {
		const response = await api.delete(`/complaints/${id}`);
		return response.data;
	} catch (error: any) {
		console.log("Error on delete Complaint ", error.message);
	}
};
/* ----------------------------Using Multer--------------------------------- */

const uploadRaisedImage = async (id: string, imageUri: string) => {
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
const raisedComplaintwithAvtarINUpload = async (payload: any) => {
	try {
		const { beforeImage } = payload;
		if (
			beforeImage.startsWith("/uploads/complaint/") ||
			beforeImage.startsWith("https://") ||
			beforeImage.startsWith("http://")
		) {
			Toast.show({
				type: "error",
				text1: "Unabled to upload Image",
			});
			return;
		}
		const response = await api.post("/complaints", payload);
		if (response.data) {
			await uploadRaisedImage(response.data._id, beforeImage);
			console.log(JSON.stringify(response.data, null, 1));
		}
		return true;
	} catch (error: any) {
		console.log("Error while Raiser complaint", error.message);
		return false;
	}
};

/* ----------------------------Comments and like --------------------------------- */
export const addComment = async (
	complaintID: string,
	userId: string,
	comments: string
) => {
	try {
		const res = await api.post(`/comment/${complaintID}/comments`, {
			userId,
			comments,
		});
		return res.data;
	} catch (error) {
		console.log("Error on comment ");
	}
};

export const likeComplaint = async (complaintID: string, userId: string) => {
	try {
		const res = await api.post(`/like/${complaintID}/likes/toggle`, {
			userId,
		});
		return res.data;
	} catch (error) {
		console.log("Error on Like ");
	}
};

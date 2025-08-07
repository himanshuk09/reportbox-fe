import * as FileSystem from "expo-file-system";

const uploadImage = async (url: any, data: any, image: any) => {
	const uri = image; // file:// URI
	const formData = {
		name: "Himanshu",
		phoneNo: "7066557751",
		state: "Maharashtra",
		city: "Pune",
		pin: "411001",
		doorNo: "101",
		street: "MG Road",
		email: "him@example.com",
	};

	const uploadUrl = "http://192.168.19.110:8080/api/users/create";

	try {
		const result = await FileSystem.uploadAsync(uploadUrl, uri, {
			fieldName: "avtar",
			httpMethod: "POST",
			uploadType: FileSystem.FileSystemUploadType.MULTIPART,
			parameters: formData,
			headers: {
				Accept: "application/json",
			},
		});

		console.log("Upload response:", result);
		const responseData = JSON.parse(result.body);
		console.log("Parsed response:", responseData);
	} catch (err) {
		console.error("Upload failed:", err);
	}
};

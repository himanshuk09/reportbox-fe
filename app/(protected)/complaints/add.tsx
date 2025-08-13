import ComplaintForm from "@/components/complaints/ComplaintForm";
import ComplaintSuccessModal from "@/components/complaints/ComplaintSuccessModal";
import ImageCard from "@/components/complaints/ImageCard";
import CameraScreen from "@/components/native/CameraScreen";
import LeafletMapWebView from "@/components/native/Map";
import RoundedButton from "@/components/ui/RoundedButton";
import { useAuth } from "@/contexts/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { raisedComplaint } from "@/services/complaint.service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
const validateFormData = (complaintData: any) => {
	const { beforeImage, type, message, location, tags } = complaintData;

	if (!beforeImage.trim()) {
		Toast.show({ type: "error", text1: "Plase upload a Image" });
		return false;
	}
	if (!type.trim()) {
		Toast.show({ type: "error", text1: "Complaint Type is required." });
		return false;
	}
	if (!message.trim()) {
		Toast.show({ type: "error", text1: "Explain your complaint." });
		return false;
	}
	if (!location.trim()) {
		Toast.show({ type: "error", text1: "Location is required." });
		return false;
	}
	if (!Array.isArray(tags) || tags.length === 0) {
		Toast.show({ type: "error", text1: "At least one tag is required." });
		return false;
	}

	return true;
};
const Complaint = () => {
	const { user } = useAuth();
	const { primaryColor, secondaryColor, textColor } = useAppTheme();
	const [showCamera, setShowCamera] = useState(false);
	const [complaintData, setComplaintData] = useState({
		beforeImage: "",
		type: "",
		subtype: "",
		message: "",
		location: "",
		tags: "",
	});
	const [showSuccess, setShowSuccess] = useState(false);
	const router = useRouter();
	const handleSetImage = (newImage: string) => {
		setComplaintData((prev) => ({
			...prev,
			beforeImage: newImage,
		}));
	};
	const [CID, setCID] = useState("");
	const handleSetLocation = (newLocation: string) => {
		setComplaintData((prev) => ({
			...prev,
			location: newLocation,
		}));
	};
	const handleSetMessage = (newExplan: string) => {
		setComplaintData((prev) => ({
			...prev,
			message: newExplan,
		}));
	};
	const handleSetTags = (newTags: string) => {
		const tagsArray = newTags
			.split(",") // split by comma
			.map((tag) => tag.trim()) // remove extra spaces
			.filter((tag) => tag.length); // remove empty strings

		setComplaintData((prev: any) => ({
			...prev,
			tags: tagsArray,
		}));
	};

	const handleSubmit = async () => {
		if (!validateFormData(complaintData)) return;

		try {
			const response: any = await raisedComplaint({
				...complaintData,
				userID: user?.user?._id,
			});
			setCID(response?.complaint?.cid);
			setShowSuccess(true);
			if (response?.success) {
				setComplaintData({
					beforeImage: "",
					type: "",
					subtype: "",
					message: "",
					location: "",
					tags: "",
				});
			}
		} catch (error) {
			console.log("error on create complaint ");
		}
	};
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: secondaryColor,
				marginTop: 110,
				padding: 16,
			}}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<Text style={[styles.title, { color: textColor }]}>
						Raise a Complaint:
					</Text>
					<ImageCard
						image={complaintData.beforeImage}
						setShowCamera={setShowCamera}
						setImage={handleSetImage}
					/>
					<ComplaintForm
						subtypes={complaintData.subtype}
						location={complaintData.location}
						setLocation={handleSetLocation}
						message={complaintData.message}
						setMessage={handleSetMessage}
						tags={complaintData.tags}
						setTags={handleSetTags}
						setComplaintType={(type: string) =>
							setComplaintData((prev) => ({ ...prev, type }))
						}
						setComplaintSubtype={(subtype: string) =>
							setComplaintData((prev) => ({ ...prev, subtype }))
						}
					/>

					<RoundedButton title={"Submit"} onPress={handleSubmit} />
					<View
						style={{
							height: 200,
							width: "100%",
							borderRadius: 20,
						}}
					>
						<LeafletMapWebView
							location={complaintData.location}
							setLocation={handleSetLocation}
						/>
					</View>
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

					<ComplaintSuccessModal
						cID={CID}
						titleText="Complaint Submitted!"
						btntext="Track Your Complaint"
						visible={showSuccess}
						onClose={() => setShowSuccess(false)}
						onTrack={() =>
							router.push("/(protected)/complaints/progress")
						}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Complaint;
const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: "bold",
		// White text
		marginBottom: 20,
	},
});

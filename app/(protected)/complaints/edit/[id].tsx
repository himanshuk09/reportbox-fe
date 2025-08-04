import ComplaintForm from "@/components/complaints/ComplaintForm";
import ComplaintSuccessModal from "@/components/complaints/ComplaintSuccessModal";
import ImageCard from "@/components/complaints/ImageCard";
import CameraScreen from "@/components/native/CameraScreen";
import LeafletMapWebView from "@/components/native/Map";
import { complaintsPosts } from "@/constants/posts";
import { useAppTheme } from "@/hooks/useAppTheme";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const ComplaintEdit = () => {
	const { id } = useLocalSearchParams();
	const post = complaintsPosts.find((p) => p.id === id);
	const { primaryColor, secondaryColor, textColor } = useAppTheme();
	const [showCamera, setShowCamera] = useState(false);
	const [complaintData, setComplaintData] = useState<any>(post);
	const [showSuccess, setShowSuccess] = useState(false);
	console.log(JSON.stringify(post, null, 1));

	const handleSetImage = (newImage: string) => {
		setComplaintData((prev: any) => ({
			...prev,
			beforeImage: newImage,
		}));
	};
	const handleSetLocation = (newLocation: string) => {
		setComplaintData((prev: any) => ({
			...prev,
			location: newLocation,
		}));
	};
	const handleSetExplaination = (newExplan: string) => {
		setComplaintData((prev: any) => ({
			...prev,
			message: newExplan,
		}));
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
						location={complaintData.location}
						setLocation={handleSetLocation}
						explanation={complaintData.message}
						setExplanation={handleSetExplaination}
						subtypes={post?.subtype}
					/>
					<TouchableOpacity
						className=" rounded-full my-3 p-3 mb-4 items-center"
						onPress={() => setShowSuccess(true)}
						style={{
							backgroundColor: primaryColor,
						}}
					>
						<Text
							className=" font-bold text-lg"
							style={{
								color: textColor,
							}}
						>
							Submit
						</Text>
					</TouchableOpacity>
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

export default ComplaintEdit;
const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: "bold",
		// White text
		marginBottom: 20,
	},
});

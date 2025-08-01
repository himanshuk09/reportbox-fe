import ImageCard from "@/components/complaints/ImageCard";
import CameraScreen from "@/components/native/CameraScreen";
import { useAppTheme } from "@/hooks/useAppTheme";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
	Alert,
	Modal,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ResolveComplaintScreen = () => {
	const initialData = {
		id: "1",
		userID: "MTNHB30",
		beforeImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		afterImage: "",
		type: "Drainage Leakage",
		status: "Assigned",
		date: "2025-07-30",
		raisedDate: new Date("2025-05-28T09:15:00"),
		responseDate: new Date("2025-05-29T11:00:00"),
		resolvedDate: null,
		assignedTo: "Worker Ravi",
		resolvedBy: "Worker Ravi",
		assignedBy: "Officer Sharma",
	};

	const [form, setForm] = useState<any>(initialData);
	const [showCamera, setShowCamera] = useState(false);
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const updateField = (key: string, value: any) =>
		setForm((prev: any) => ({ ...prev, [key]: value }));

	const handleSubmit = () => {
		if (!form.afterImage || !form.resolvedDate) {
			Alert.alert(
				"Error",
				"Please upload image and select resolved date."
			);
			return;
		}
		updateField("status", "Resolved");
		Alert.alert(
			"Resolved",
			JSON.stringify({ ...form, status: "Resolved" }, null, 2)
		);
	};

	const showDatePicker = () => {
		DateTimePickerAndroid.open({
			value: form.resolvedDate || new Date(),
			onChange: (_, selectedDate) => {
				if (selectedDate) {
					updateField("resolvedDate", selectedDate);
				}
			},
			mode: "date",
			is24Hour: true,
		});
	};

	const handleSetAfterImage = (uri: string) => {
		updateField("afterImage", uri);
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 90,
			}}
		>
			<ScrollView
				contentContainerStyle={{ paddingBottom: 16 }}
				showsVerticalScrollIndicator={false}
			>
				<Text
					className="text-2xl  font-bold mb-4"
					style={{
						color: textColor,
					}}
				>
					Resolve Complaint
				</Text>

				{/* Read-Only Info */}
				<Text
					className=" mb-1"
					style={{
						color: textColor,
					}}
				>
					Type: {form.type}
				</Text>
				<Text
					className=" mb-1"
					style={{
						color: textColor,
					}}
				>
					Status: {form.status}
				</Text>
				<Text
					className=" mb-1"
					style={{
						color: textColor,
					}}
				>
					Assigned By: {form.assignedBy}
				</Text>
				<Text
					className=" mb-1"
					style={{
						color: textColor,
					}}
				>
					Assigned To: {form.assignedTo}
				</Text>
				<Text
					className=" mb-1"
					style={{
						color: textColor,
					}}
				>
					Raised On: {form.raisedDate.toLocaleString()}
				</Text>
				<Text
					className=" mb-1"
					style={{
						color: textColor,
					}}
				>
					Response On: {form.responseDate.toLocaleString()}
				</Text>

				{/* Before Image (read-only) */}
				<Text
					className="text-xl mt-4 mb-1"
					style={{
						color: textColor,
					}}
				>
					Before Image
				</Text>
				<ImageCard image={form.beforeImage} showCaptureIcon={false} />

				{/* After Image */}
				<Text
					className="text-xl mt-4 mb-1"
					style={{
						color: textColor,
					}}
				>
					After Image
				</Text>
				<ImageCard
					image={form.afterImage}
					setShowCamera={setShowCamera}
					setImage={handleSetAfterImage}
					showCaptureIcon={true}
				/>

				{/* Resolved Date Picker */}
				<TouchableOpacity
					onPress={showDatePicker}
					className="mt-4 mb-4"
				>
					<View
						className=" p-3 rounded-lg"
						style={{
							backgroundColor: cardsColor,
						}}
					>
						<Text
							style={{
								color: textColor,
							}}
						>
							Resolved On:{" "}
							{form.resolvedDate
								? form.resolvedDate.toLocaleString()
								: "Select Date"}
						</Text>
					</View>
				</TouchableOpacity>

				{/* Submit */}
				<TouchableOpacity
					onPress={handleSubmit}
					className="bg-green-600 py-3 rounded-xl mb-10"
				>
					<Text
						className="text-center font-bold"
						style={{
							color: "white",
						}}
					>
						Mark as Resolved
					</Text>
				</TouchableOpacity>

				{/* Camera Modal */}
				<Modal
					visible={showCamera}
					animationType="fade"
					presentationStyle="fullScreen"
				>
					<CameraScreen
						setShowCamera={setShowCamera}
						setImage={handleSetAfterImage}
					/>
				</Modal>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ResolveComplaintScreen;

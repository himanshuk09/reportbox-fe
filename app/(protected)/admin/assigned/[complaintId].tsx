import ImageCard from "@/components/complaints/ImageCard";
import CameraScreen from "@/components/native/CameraScreen";
import Loader from "@/components/ui/Loader";
import RoundedButton from "@/components/ui/RoundedButton";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	getComplaintsByID,
	updateComplaint,
} from "@/services/complaint.service";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const ResolveComplaintScreen = () => {
	const { complaintId } = useLocalSearchParams(); // passed from previous screen
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { textColor, secondaryColor, cardsColor } = useAppTheme();

	/* -------------------------------------------------------------------------- */
	const [form, setForm] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [showCamera, setShowCamera] = useState(false);
	const [resolvedMessage, setResolvedMessage] = useState("");

	/* -------------------------------------------------------------------------- */

	const updateField = (key: string, value: any) =>
		setForm((prev: any) => ({ ...prev, [key]: value }));

	const showDatePicker = () => {
		DateTimePickerAndroid.open({
			value: form?.resolvedDate
				? new Date(form.resolvedDate)
				: new Date(),
			onChange: (_, selectedDate) => {
				if (selectedDate) updateField("resolvedDate", selectedDate);
			},
			mode: "date",
			is24Hour: true,
		});
	};

	const handleSetAfterImage = (uri: string) => {
		updateField("afterImage", uri);
	};

	const handleSubmit = async () => {
		if (!form.afterImage || !form.resolvedDate) {
			Alert.alert(
				"Error",
				"Please upload after image and select resolved date."
			);
			return;
		}
		try {
			setGlobalLoading(true);
			await updateComplaint(complaintId as string, form);
			Toast.show({
				type: "success",
				text1: "Complaint updated successfully",
			});
		} catch (err) {
			console.error("Error updating complaint:", err);
			Toast.show({ type: "error", text1: "Failed to update complaint" });
		} finally {
			setGlobalLoading(false);
		}
	};

	/* -------------------------------------------------------------------------- */

	useEffect(() => {
		(async () => {
			try {
				const data = await getComplaintsByID(complaintId as string);
				setForm(data);
			} catch (err) {
				Alert.alert("Error", "Failed to load complaint.");
			} finally {
				setLoading(false);
			}
		})();
	}, [complaintId]);
	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);

	/* -------------------------------------------------------------------------- */
	if (loading) return <Loader />;

	return (
		<SafeAreaView
			style={{
				flex: 1,
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 55,
			}}
		>
			<ScrollView
				contentContainerStyle={{ paddingBottom: 16 }}
				showsVerticalScrollIndicator={false}
			>
				<Text
					className="text-2xl font-bold mb-4"
					style={{ color: textColor }}
				>
					Resolve Complaint
				</Text>

				{/* Read Only Info */}
				<Text style={{ color: textColor }}>
					Type: {form?.type?.name || form?.type}
				</Text>
				<Text style={{ color: textColor }}>Status: {form?.status}</Text>
				<Text style={{ color: textColor }}>
					Assigned By: {form?.assignedBy?.name || form?.assignedBy}
				</Text>
				<Text style={{ color: textColor }}>
					Assigned To: {form?.assignedTo?.name || form?.assignedTo}
				</Text>
				<Text style={{ color: textColor }}>
					Raised On: {new Date(form?.raisedDate).toLocaleString()}
				</Text>

				{/* Before Image */}
				<Text style={{ color: textColor, marginTop: 12 }}>
					Before Image
				</Text>
				<ImageCard image={form?.beforeImage} showCaptureIcon={false} />

				{/* After Image */}
				<Text style={{ color: textColor, marginTop: 12 }}>
					After Image
				</Text>
				<ImageCard
					image={form?.afterImage}
					setShowCamera={setShowCamera}
					setImage={handleSetAfterImage}
					showCaptureIcon={true}
				/>

				{/* Resolved Date Picker */}
				<TouchableOpacity
					onPress={showDatePicker}
					style={{ marginTop: 16 }}
				>
					<View
						style={{
							padding: 12,
							borderRadius: 8,
							backgroundColor: cardsColor,
						}}
					>
						<Text style={{ color: textColor }}>
							Resolved On:{" "}
							{form?.resolvedDate
								? new Date(
										form.resolvedDate
									).toLocaleDateString()
								: "Select Date"}
						</Text>
					</View>
				</TouchableOpacity>

				{/* Resolved Message */}
				<Text style={{ color: textColor, marginTop: 16 }}>
					Resolved Message
				</Text>
				<TextInput
					multiline
					numberOfLines={4}
					placeholder="Describe resolution..."
					value={resolvedMessage}
					onChangeText={setResolvedMessage}
					placeholderTextColor={textColor}
					style={{
						marginTop: 8,
						padding: 12,
						borderRadius: 8,
						backgroundColor: cardsColor,
						color: textColor,
					}}
				/>

				{/* Submit */}
				<RoundedButton
					title="Mark as Resolved"
					onPress={handleSubmit}
				/>

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

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		marginBottom: 6,
		fontWeight: "bold",
	},

	textArea: {
		padding: 12,
		borderRadius: 8,
		height: 100,
		marginVertical: 10,
		textAlignVertical: "top",
		color: "#ccc",
	},
});

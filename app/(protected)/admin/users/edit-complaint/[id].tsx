import ImageCard from "@/components/complaints/ImageCard";
import CameraScreen from "@/components/native/CameraScreen";
import CustomAlert from "@/components/ui/CustomAlert";
import Loader from "@/components/ui/Loader";
import { Status } from "@/constants/banners";
import { complaintTypes } from "@/constants/complaints";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	deleteComplaintByID,
	getComplaintsByID,
	updateComplaint,
} from "@/services/complaint.service";
import { getUsersByGroupId } from "@/services/group-user.service";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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

const dateFieldMap = {
	raised: "raisedDate",
	response: "responseDate",
	resolved: "resolvedDate",
} as const;

type PickerKey = keyof typeof dateFieldMap;

const EditComplaintScreen = () => {
	const { id } = useLocalSearchParams();
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { secondaryColor, textColor, cardsColor, primaryColor } =
		useAppTheme();

	/* -------------------------------------------------------------------------- */

	const [form, setForm] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [showCamera, setShowCamera] = useState(false);
	const [workerlist, setWorkerList] = useState<any>([]);

	/* -------------------------------------------------------------------------- */
	const updateField = (key: string, value: any) =>
		setForm((prev: any) => ({ ...prev, [key]: value }));

	const handleSubmit = async () => {
		try {
			setGlobalLoading(true);
			await updateComplaint(id as string, form);

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

	const handleDelete = () => {
		CustomAlert({
			title: "Delete Complaint!",
			description:
				"Are you sure you want to delete this complaint? This action cannot be undone.",
			onConfirm: async () => {
				try {
					await deleteComplaintByID(form?._id);
					router.back(); // go back after delete
				} catch (error) {
					console.log("Error deleting complaint:", error);
				}
			},
		});
	};

	const showDatePicker = (key: PickerKey) => {
		DateTimePickerAndroid.open({
			value: form?.[dateFieldMap[key]]
				? new Date(form[dateFieldMap[key]])
				: new Date(),
			onChange: (_, selectedDate) => {
				if (selectedDate) {
					updateField(dateFieldMap[key], selectedDate);
				}
			},
			mode: "date",
			is24Hour: true,
		});
	};

	const handleSetBeforeImage = (newImage: string) => {
		updateField("beforeImage", newImage);
	};
	const handleSetAfterImage = (newImage: string) => {
		updateField("afterImage", newImage);
	};

	const renderDateField = (label: string, key: PickerKey) => (
		<TouchableOpacity
			key={key}
			onPress={() => showDatePicker(key)}
			className="mb-3"
		>
			<View
				className="p-3 rounded-lg"
				style={{ backgroundColor: cardsColor }}
			>
				<Text style={{ color: textColor }}>
					{label}:{" "}
					{form?.[dateFieldMap[key]]
						? new Date(form[dateFieldMap[key]]).toLocaleString()
						: "Not set"}
				</Text>
			</View>
		</TouchableOpacity>
	);
	const fetchUserByGroupID = async (
		groupId: string = "68a5771298cc88b189812ec2"
	) => {
		try {
			const response: any = await getUsersByGroupId(groupId);
			setWorkerList(response);
		} catch (error) {
			console.log("Error on fetching group users", error);
		}
	};
	const fetchComplaint = async () => {
		try {
			setLoading(true);
			const data = await getComplaintsByID(id as string);
			setForm({
				...data,
				beforeImage: data.beforeImage || "",
				afterImage: data.afterImage || "",
				type: data.type || "",
				status: data.status || "Raised",
				raisedDate: data.raisedDate || new Date(),
				responseDate: data.responseDate || null,
				resolvedDate: data.resolvedDate || null,
				assignedTo: data.assignedTo || "",
				resolvedBy: data.resolvedBy || "",
				assignedBy: data.assignedBy || "",
				message: data.message || "",
				resolvedMessage: data.resolvedMessage || "",
			});
		} catch (err) {
			console.error("Error fetching complaint:", err);
		} finally {
			setLoading(false);
		}
	};

	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		if (id) {
			fetchComplaint();
			fetchUserByGroupID();
		}
	}, [id]);

	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);

	/* -------------------------------------------------------------------------- */
	if (loading || !form) {
		return <Loader />;
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: secondaryColor,
				marginTop: 80,
				padding: 10,
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
					Edit Complaint
				</Text>

				{/* Before Image */}
				<Text className="text-xl mb-1" style={{ color: textColor }}>
					Before Image
				</Text>
				<ImageCard
					image={form.beforeImage}
					setShowCamera={setShowCamera}
					setImage={(uri: string) => updateField("beforeImage", uri)}
					showCaptureIcon={false}
				/>

				{/* After Image */}
				<Text className="text-xl mb-1" style={{ color: textColor }}>
					After Image
				</Text>
				<ImageCard
					image={form.afterImage}
					setShowCamera={setShowCamera}
					setImage={(uri: string) => updateField("afterImage", uri)}
					showCaptureIcon={true}
				/>

				{/* Complaint Type */}
				<Text className="mb-1" style={{ color: textColor }}>
					Complaint Type
				</Text>
				<View
					className="rounded-lg mb-3"
					style={{
						backgroundColor: cardsColor,
						borderRadius: 10,
						overflow: "hidden",
						marginBottom: 12,
					}}
				>
					<Picker
						selectedValue={form.type || ""}
						onValueChange={(val) => updateField("type", val)}
					>
						<Picker.Item label="Select" value="" />
						{complaintTypes.map((item) => (
							<Picker.Item
								key={item.label}
								label={item.label}
								value={item.label}
							/>
						))}
					</Picker>
				</View>

				{/* Messages */}
				<Text style={[styles.label, { color: textColor }]}>
					Issue Explained
				</Text>
				<TextInput
					multiline
					numberOfLines={4}
					placeholder="Describe your complaint here"
					style={[
						styles.textArea,
						{ color: textColor, backgroundColor: cardsColor },
					]}
					value={form.message}
					onChangeText={(val) => updateField("message", val)}
				/>
				<Text style={[styles.label, { color: textColor }]}>
					Resolved Message
				</Text>
				<TextInput
					multiline
					numberOfLines={4}
					placeholder="Describe how it was resolved"
					style={[
						styles.textArea,
						{ color: textColor, backgroundColor: cardsColor },
					]}
					value={form.afterResolvedMessage || ""}
					onChangeText={(val) =>
						updateField("afterResolvedMessage", val)
					}
				/>

				{/* Complaint Status */}
				<Text className="mb-1" style={{ color: textColor }}>
					Complaint Status
				</Text>
				<View
					className="rounded-lg mb-3"
					style={{
						backgroundColor: cardsColor,
						borderRadius: 10,
						overflow: "hidden",
						marginBottom: 12,
					}}
				>
					<Picker
						selectedValue={form.status || ""}
						onValueChange={(val) => updateField("status", val)}
					>
						<Picker.Item label="Select" value="" />
						{Status.map((s) => (
							<Picker.Item key={s} label={s} value={s} />
						))}
					</Picker>
				</View>

				{/* Staff Pickers */}
				{["assignedBy", "assignedTo", "resolvedBy"].map((field) => (
					<View key={field} className="mb-3">
						<Text className="mb-1" style={{ color: textColor }}>
							{field.replace(/([A-Z])/g, " $1")}
						</Text>
						<View
							className="rounded-lg"
							style={{
								backgroundColor: cardsColor,
								borderRadius: 10,
								overflow: "hidden",
								marginBottom: 12,
							}}
						>
							<Picker
								selectedValue={
									form[field]?._id || form[field] || ""
								}
								onValueChange={(val) => updateField(field, val)}
								style={{ color: textColor }}
								dropdownIconColor={textColor}
							>
								<Picker.Item label="Select" value="" />
								{workerlist.map((worker: any) => (
									<Picker.Item
										key={worker._id}
										label={worker.name}
										value={worker._id}
									/>
								))}
							</Picker>
						</View>
					</View>
				))}

				{/* Date Fields */}
				{renderDateField("Raised On", "raised")}
				{renderDateField("Responded On", "response")}
				{renderDateField("Resolved On", "resolved")}
				{/* Buttons */}
				<View className="flex-row justify-between mt-4 mb-10">
					<TouchableOpacity
						onPress={handleSubmit}
						className="flex-1  py-3 rounded-xl mr-2"
						style={{ backgroundColor: primaryColor }}
					>
						<Text
							className="text-center font-bold"
							style={{ color: cardsColor }}
						>
							Submit
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={handleDelete}
						className="flex-1 bg-red-600 py-3 rounded-xl ml-2"
					>
						<Text
							className="text-center font-bold"
							style={{ color: cardsColor }}
						>
							Delete
						</Text>
					</TouchableOpacity>
				</View>

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
export default EditComplaintScreen;
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

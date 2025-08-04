import ImageCard from "@/components/complaints/ImageCard";
import CameraScreen from "@/components/native/CameraScreen";
import { useAppTheme } from "@/hooks/useAppTheme";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
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
const staffNames = [
	"Officer Sharma",
	"Sanitation Head",
	"blabla",
	"abc",
	"Cleaner Ravi",
	"Supervisor Meena",
];

const dateFieldMap = {
	raised: "raisedDate",
	response: "responseDate",
	resolved: "resolvedDate",
} as const;

type PickerKey = keyof typeof dateFieldMap;

const EditComplaintScreen = () => {
	const initialData = {
		id: "1",
		userID: "MTNHB30",
		beforeImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		afterImage:
			"https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format",
		type: "Drainage Leakage",
		status: "Assigned",
		date: "2025-07-30",
		raisedDate: new Date("2025-05-28T09:15:00"),
		responseDate: new Date("2025-05-29T11:00:00"),
		resolvedDate: new Date("2025-05-29T16:20:00"),
		assignedTo: "Officer Sharma",
		resolvedBy: "blabla",
		assignedBy: "abc",
	};
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const [form, setForm] = useState(initialData);
	const [showCamera, setShowCamera] = useState(false);
	const updateField = (key: string, value: any) =>
		setForm((prev) => ({ ...prev, [key]: value }));

	const handleSubmit = () => {
		Alert.alert("Submitted", JSON.stringify(form, null, 2));
	};

	const handleDelete = () => {
		Alert.alert("Deleted", `Complaint ${form.id} removed.`);
	};

	const showDatePicker = (key: PickerKey) => {
		DateTimePickerAndroid.open({
			value: form[dateFieldMap[key]] || new Date(),
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
		setForm((prev) => ({
			...prev,
			beforeImage: newImage,
		}));
	};
	const handleSetAfterImage = (newImage: string) => {
		setForm((prev) => ({
			...prev,
			afterImage: newImage,
		}));
	};
	const renderDateField = (label: string, key: PickerKey) => (
		<TouchableOpacity onPress={() => showDatePicker(key)} className="mb-3">
			<View
				className="p-3 rounded-lg"
				style={{
					backgroundColor: cardsColor,
				}}
			>
				<Text
					style={{
						color: textColor,
					}}
				>
					{label}: {form[dateFieldMap[key]]?.toLocaleString()}
				</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: secondaryColor,
				marginTop: 100,
				padding: 10,
			}}
		>
			<ScrollView
				contentContainerStyle={{ paddingBottom: 16 }}
				showsVerticalScrollIndicator={false}
			>
				<Text
					className="text-2xl font-bold mb-4"
					style={{
						color: textColor,
					}}
				>
					Edit Complaint
				</Text>

				{/* Images */}
				<Text
					className=" text-xl mb-1"
					style={{
						color: textColor,
					}}
				>
					Before Image
				</Text>
				<ImageCard
					image={form.beforeImage}
					setShowCamera={setShowCamera}
					setImage={handleSetBeforeImage}
					showCaptureIcon={false}
				/>
				<Text
					className=" text-xl mb-1"
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

				{/* Complaint Type */}
				<Text
					className=" mb-1"
					style={{
						color: textColor,
					}}
				>
					Complaint Type
				</Text>
				<View
					className="rounded-lg mb-3"
					style={{
						backgroundColor: cardsColor,
					}}
				>
					<Picker
						selectedValue={form.type}
						onValueChange={(val) => updateField("type", val)}
						style={{ color: textColor }}
						dropdownIconColor={textColor}
					>
						<Picker.Item
							label="Drainage Leakage"
							value="Drainage Leakage"
						/>
						<Picker.Item label="Garbage" value="Garbage" />
						<Picker.Item
							label="Stray Animals"
							value="Stray Animals"
						/>
					</Picker>
				</View>

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
					// value={message}
					// onChangeText={setMessage}
				/>
				<Text style={[styles.label, { color: textColor }]}>
					Resolved message
				</Text>
				<TextInput
					multiline
					numberOfLines={4}
					placeholder="Describe your resolved complaint here"
					style={[
						styles.textArea,
						{ color: textColor, backgroundColor: cardsColor },
					]}
					// value={message}
					// onChangeText={setMessage}
				/>
				{/* Complaint Status */}
				<Text
					className=" mb-1"
					style={{
						color: textColor,
					}}
				>
					Complaint Status
				</Text>
				<View
					className=" rounded-lg mb-3"
					style={{
						backgroundColor: cardsColor,
					}}
				>
					<Picker
						selectedValue={form.status}
						onValueChange={(val) => updateField("status", val)}
						style={{ color: textColor }}
						dropdownIconColor={textColor}
					>
						<Picker.Item label="Raised" value="Raised" />
						<Picker.Item label="Assigned" value="Assigned" />
						<Picker.Item label="In Progress" value="In Progress" />
						<Picker.Item label="Resolved" value="Resolved" />
					</Picker>
				</View>

				{/* Staff Pickers */}
				<Text
					className=" mb-1"
					style={{
						color: textColor,
					}}
				>
					Assigned To
				</Text>
				<View
					className="rounded-lg mb-3"
					style={{
						backgroundColor: cardsColor,
					}}
				>
					<Picker
						selectedValue={form.assignedTo}
						onValueChange={(val) => updateField("assignedTo", val)}
						style={{ color: textColor }}
						dropdownIconColor={textColor}
					>
						{staffNames.map((name) => (
							<Picker.Item key={name} label={name} value={name} />
						))}
					</Picker>
				</View>

				<Text
					className=" mb-1"
					style={{
						color: textColor,
					}}
				>
					Assigned By
				</Text>
				<View
					className=" rounded-lg mb-3"
					style={{
						backgroundColor: cardsColor,
					}}
				>
					<Picker
						selectedValue={form.assignedBy}
						onValueChange={(val) => updateField("assignedBy", val)}
						style={{ color: textColor }}
						dropdownIconColor={textColor}
					>
						{staffNames.map((name) => (
							<Picker.Item key={name} label={name} value={name} />
						))}
					</Picker>
				</View>

				<Text
					className=" mb-1"
					style={{
						color: textColor,
					}}
				>
					Resolved By
				</Text>
				<View
					className=" rounded-lg mb-3"
					style={{
						backgroundColor: cardsColor,
					}}
				>
					<Picker
						selectedValue={form.resolvedBy}
						onValueChange={(val) => updateField("resolvedBy", val)}
						style={{ color: textColor }}
						dropdownIconColor={textColor}
					>
						{staffNames.map((name) => (
							<Picker.Item key={name} label={name} value={name} />
						))}
					</Picker>
				</View>

				{/* Date Fields */}
				{renderDateField("Raised On", "raised")}
				{renderDateField("Responded On", "response")}
				{renderDateField("Resolved On", "resolved")}

				{/* Buttons */}
				<View className="flex-row justify-between mt-4 mb-10">
					<TouchableOpacity
						onPress={handleSubmit}
						className="flex-1 bg-green-600 py-3 rounded-xl mr-2"
					>
						<Text
							className=" text-center font-bold"
							style={{
								color: textColor,
							}}
						>
							Submit
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={handleDelete}
						className="flex-1 bg-red-600 py-3 rounded-xl ml-2"
					>
						<Text
							className=" text-center font-bold"
							style={{
								color: textColor,
							}}
						>
							Delete
						</Text>
					</TouchableOpacity>
				</View>
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

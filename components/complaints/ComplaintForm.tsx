import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { getLocationDetails } from "../native/Map";

const complaintData = [
	{
		type: "Water Department",
		subtypes: ["No Supply", "Dirty Water", "Leakage", "Low Pressure"],
	},
	{
		type: "Lighting Department",
		subtypes: ["Street Light Out", "Flickering", "Broken Pole"],
	},
	{
		type: "Sewerage & Drainage",
		subtypes: ["Clogged Drain", "Open Sewer", "Overflow"],
	},
];

export default function ComplaintForm({
	location,
	setLocation,
	explanation,
	setExplanation,
}: any) {
	const [modalVisible, setModalVisible] = useState(false);
	const [expandedType, setExpandedType] = useState<string | null>(null);
	const [selectedSubtypes, setSelectedSubtypes] = useState<string[]>([]);

	const toggleSubtype = (subtype: string) => {
		setSelectedSubtypes((prev) =>
			prev.includes(subtype)
				? prev.filter((s) => s !== subtype)
				: [...prev, subtype]
		);
	};

	return (
		<View style={{ flex: 1, padding: 10 }}>
			{/* Complaint Type Field */}
			<Text style={styles.label}>Complaint Type</Text>
			<TouchableOpacity
				style={styles.field}
				onPress={() => setModalVisible(true)}
			>
				<Text
					style={{ color: selectedSubtypes.length ? "#ccc" : "#999" }}
				>
					{selectedSubtypes.length > 0
						? selectedSubtypes.join(", ")
						: "Select complaint type"}
				</Text>
			</TouchableOpacity>

			{/* Location Field */}
			<Text style={styles.label}>Your Location</Text>
			<View style={styles.field}>
				<Text
					style={{ color: "#ccc" }}
					onPress={async () => {
						const { geo, loc }: any = await getLocationDetails();
						setLocation(geo[0]?.formattedAddress);
					}}
				>
					{location}
				</Text>
			</View>

			{/* Explanation Field */}
			<Text style={styles.label}>Explain your issue</Text>
			<TextInput
				multiline
				numberOfLines={4}
				placeholder="Describe your complaint here"
				style={styles.textArea}
				value={explanation}
				onChangeText={setExplanation}
			/>

			{/* Complaint Modal */}
			<Modal
				visible={modalVisible}
				animationType="fade"
				onRequestClose={() => setModalVisible(false)}
			>
				<View
					style={{ flex: 1, padding: 10, backgroundColor: "#343232" }}
				>
					<Text style={styles.modalTitle}>
						Select Complaint Subtype
					</Text>
					<ScrollView>
						{complaintData.map((item, index) => (
							<View key={index}>
								<TouchableOpacity
									style={styles.typeItem}
									onPress={() =>
										setExpandedType(
											expandedType === item.type
												? null
												: item.type
										)
									}
								>
									<Text style={styles.typeText}>
										{item.type}
									</Text>
									<AntDesign
										name={
											expandedType === item.type
												? "up"
												: "down"
										}
										size={18}
										color="#ccc"
									/>
								</TouchableOpacity>

								{expandedType === item.type && (
									<View
										style={{ marginLeft: 10, marginTop: 5 }}
									>
										{item.subtypes.map((sub, i) => (
											<TouchableOpacity
												key={i}
												style={[
													styles.subtypeItem,
													selectedSubtypes.includes(
														sub
													) &&
														styles.subtypeItemSelected,
												]}
												onPress={() =>
													toggleSubtype(sub)
												}
											>
												<Text
													style={{
														color: selectedSubtypes.includes(
															sub
														)
															? "#343232"
															: "#ccc",
													}}
												>
													{sub}
												</Text>
											</TouchableOpacity>
										))}
									</View>
								)}
							</View>
						))}
					</ScrollView>

					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => setModalVisible(false)}
					>
						<Text style={styles.closeButtonText}>Done</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		marginBottom: 6,
		fontWeight: "bold",
		color: "#fff",
	},
	field: {
		backgroundColor: "#1e1e1e",
		padding: 12,
		borderRadius: 5,
		marginVertical: 10,
	},
	textArea: {
		backgroundColor: "#1e1e1e",
		padding: 12,
		borderRadius: 8,
		height: 100,
		marginVertical: 10,
		textAlignVertical: "top",
		color: "#ccc",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#ccc",
	},
	typeItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#1e1e1e",
		padding: 12,
		borderRadius: 3,
		marginBottom: 5,
	},
	typeText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#ccc",
	},
	subtypeItem: {
		backgroundColor: "#1e1e1e",
		padding: 10,
		borderRadius: 5,
		marginVertical: 4,
	},
	subtypeItemSelected: {
		backgroundColor: "#00EEFF",
	},
	closeButton: {
		backgroundColor: "#00EEFF",
		padding: 14,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 20,
	},
	closeButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

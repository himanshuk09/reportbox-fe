import { complaintTypes } from "@/constants/complaints";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	AntDesign,
	Entypo,
	FontAwesome,
	FontAwesome5,
	FontAwesome6,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
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
const ICON_MAP: any = {
	AntDesign,
	FontAwesome,
	FontAwesome5,
	FontAwesome6,
	MaterialCommunityIcons,
	MaterialIcons,
	Entypo,
};

export default function ComplaintForm({
	location,
	setLocation,
	explanation,
	setExplanation,
	subtypes,
}: any) {
	const [modalVisible, setModalVisible] = useState(false);
	const [expandedType, setExpandedType] = useState<string | null>(null);
	const [selectedSubtypes, setSelectedSubtypes] = useState<string[]>(
		subtypes ?? ""
	);
	const { primaryColor, secondaryColor, cardsColor, textColor } =
		useAppTheme();

	const toggleSubtype = (subtype: string) => {
		//single
		setSelectedSubtypes((prev: any) =>
			prev[0] === subtype ? [] : [subtype]
		);
		//multi select
		// setSelectedSubtypes((prev: any) =>
		// 	prev.includes(subtype)
		// 		? prev.filter((s: any) => s !== subtype)
		// 		: [...prev, subtype]
		// );
	};
	return (
		<View style={{ flex: 1, padding: 10 }}>
			{/* Complaint Type Field */}
			<Text style={[styles.label, { color: textColor }]}>
				Complaint Type
			</Text>
			<TouchableOpacity
				style={[styles.field, { backgroundColor: cardsColor }]}
				onPress={() => setModalVisible(true)}
			>
				<Text
					style={{
						color: selectedSubtypes?.length ? textColor : "#999",
					}}
				>
					{selectedSubtypes?.length > 0
						? selectedSubtypes.join(", ")
						: "Select complaint type"}
				</Text>
			</TouchableOpacity>

			{/* Location Field */}
			<Text style={[styles.label, { color: textColor }]}>
				Your Location
			</Text>
			<View style={[styles.field, { backgroundColor: cardsColor }]}>
				<Text
					style={{ color: textColor }}
					onPress={async () => {
						const { geo, loc }: any = await getLocationDetails();
						setLocation(geo[0]?.formattedAddress);
					}}
				>
					{location}
				</Text>
			</View>

			{/* Explanation Field */}
			<Text style={[styles.label, { color: textColor }]}>
				Explain your issue
			</Text>
			<TextInput
				multiline
				numberOfLines={4}
				placeholder="Describe your complaint here"
				style={[
					styles.textArea,
					{ color: textColor, backgroundColor: cardsColor },
				]}
				value={explanation}
				onChangeText={setExplanation}
			/>
			<Text style={[styles.label, { color: textColor }]}>Hash Tags</Text>
			<TextInput
				multiline
				numberOfLines={3}
				placeholder="Describe your complaint here"
				style={[
					styles.field,
					{ color: textColor, backgroundColor: cardsColor },
				]}
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
					style={{
						flex: 1,
						padding: 10,
						backgroundColor: secondaryColor,
					}}
				>
					<Text style={[styles.modalTitle, { color: textColor }]}>
						Select Complaint Type
					</Text>

					<ScrollView showsVerticalScrollIndicator={false}>
						{complaintTypes?.map((item: any, index) => {
							const IconType = ICON_MAP[item.iconType];
							return (
								<View key={index}>
									<TouchableOpacity
										style={styles.typeItem}
										onPress={() =>
											setExpandedType(
												expandedType === item.label
													? null
													: item.label
											)
										}
									>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
											}}
										>
											{IconType && (
												<IconType
													name={item.icon}
													size={20}
													color={primaryColor}
													style={{ marginRight: 10 }}
												/>
											)}
											<Text style={styles.typeText}>
												{item.label}
											</Text>
										</View>
										<AntDesign
											name={
												expandedType === item.label
													? "up"
													: "down"
											}
											size={18}
											color="#ccc"
										/>
									</TouchableOpacity>

									{expandedType === item.label && (
										<View
											style={{
												marginLeft: 10,
												marginTop: 5,
											}}
										>
											{item.categories.map(
												(sub: any, i: any) => {
													const SubIcon =
														ICON_MAP[sub.iconType];
													return (
														<TouchableOpacity
															key={i}
															style={[
																styles.subtypeItem,
																selectedSubtypes.includes(
																	sub.label
																) && {
																	backgroundColor:
																		primaryColor,
																},
															]}
															onPress={() =>
																toggleSubtype(
																	sub.label
																)
															}
														>
															<View
																style={{
																	flexDirection:
																		"row",
																	alignItems:
																		"center",
																}}
															>
																{SubIcon && (
																	<SubIcon
																		name={
																			sub.icon
																		}
																		size={
																			18
																		}
																		color={
																			selectedSubtypes.includes(
																				sub.label
																			)
																				? secondaryColor
																				: primaryColor
																		}
																		style={{
																			marginRight: 8,
																		}}
																	/>
																)}
																<Text
																	style={{
																		color: selectedSubtypes.includes(
																			sub.label
																		)
																			? secondaryColor
																			: "#ccc",
																	}}
																>
																	{sub.label}
																</Text>
															</View>
														</TouchableOpacity>
													);
												}
											)}
										</View>
									)}
								</View>
							);
						})}
					</ScrollView>

					{/* Done Button */}
					<TouchableOpacity
						style={[
							styles.closeButton,
							{
								backgroundColor: primaryColor,
							},
						]}
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
	},
	field: {
		backgroundColor: "#1e1e1e",
		padding: 12,
		borderRadius: 5,
		marginVertical: 10,
	},
	textArea: {
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

	closeButton: {
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

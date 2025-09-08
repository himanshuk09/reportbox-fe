import { sendMultipleNotification } from "@/components/NotificationWrapper";
import CustomAlert from "@/components/ui/CustomAlert";
import RoundedButton from "@/components/ui/RoundedButton";
import { NOTIFICATION_TYPES } from "@/constants/complaints";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	deleteTokenByUserId,
	getTokensWithUser,
} from "@/services/push-notification.service";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import {
	Alert,
	FlatList,
	Image,
	KeyboardAvoidingView,
	Modal,
	Platform,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	ToastAndroid,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
const NotificationSenderScreen = () => {
	const {
		primaryColor,
		secondaryColor,
		textColor,
		cardsColor,
		transparentBackground,
	} = useAppTheme();
	const { setGlobalLoading } = useLoading();
	const isFocused = useIsFocused();
	/* -------------------------------------------------------------------------- */
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [subtitle, setSubtitle] = useState("");
	const [richContent, setRichContent] = useState({
		image: "",
	});
	const [category, setCategory] = useState({
		categoryIdentifier: "simple",
		categoryId: "simple",
	});
	const [dataFields, setDataFields] = useState<
		{ key: string; value: string }[]
	>([]);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [list, setList] = useState<any>([]);
	const [showUserModal, setShowUserModal] = useState<any>(false);
	const [refreshing, setRefreshing] = useState(false);

	const [detailUser, setDetailUser] = useState<any>(null);
	/* -------------------------------------------------------------------------- */
	const toggleUser = (UID?: string) => {
		if (!UID) return; // avoid null/undefined
		setSelectedUsers((prev) =>
			prev.includes(UID)
				? prev.filter((id) => id !== UID)
				: [...prev, UID]
		);
	};

	const addDataField = () =>
		setDataFields((prev) => [...prev, { key: "", value: "" }]);

	const updateDataField = (index: number, key: string, value: string) => {
		const newFields = [...dataFields];
		newFields[index] = { key, value };
		setDataFields(newFields);
	};

	const removeDataField = (index: number) => {
		const newFields = [...dataFields];
		newFields.splice(index, 1);
		setDataFields(newFields);
	};

	const fetchTokens = async () => {
		const response = await getTokensWithUser();
		setList(response.tokens);
	};

	const sendNotification = async () => {
		if (!title || !body) {
			Toast.show({ type: "error", text1: "Title and Body are required" });
			return;
		}

		let dataJson: any = {};
		dataFields.forEach((f) => {
			if (f.key) dataJson[f.key] = f.value;
		});

		try {
			setGlobalLoading(true);

			// Get all selected users
			const selected = list.filter((u: any) =>
				selectedUsers.includes(u?.userId?.UID)
			);
			if (selected.length === 0) {
				Toast.show({
					type: "error",
					text1: "No users selected",
					text2: "Please select at least one user to send notification",
				});
				return;
			}

			// Build notifications array
			const notifications: Notifications.NotificationContentInput[] =
				selected.map((user: any) => ({
					to: user.token,
					title: title,
					body: body,
					ttl: undefined,
					categoryIdentifier: category.categoryIdentifier,
					categoryId: category.categoryId,
					richContent: {
						image: richContent?.image || user?.userId?.avatar,
					},

					data:
						Object.keys(dataJson).length > 0
							? dataJson
							: {
									url: "https://report-box.expo.app/",
									extraInfo: "You have a new alert",
								},
					autoDismiss: true,
					badge: 2,
					interruptionLevel: "active",
					priority: Notifications.AndroidNotificationPriority.HIGH,
					sticky: true,
					launchImageName: "hello",
					subtitle: subtitle || "New Notification",
					sound: "default",
					attachments: [
						{
							identifier: "profile_image",
							url: user?.userId?.avatar, // 👈 use user avatar here
							type: "image",
						},
					],
					icon: user?.userId?.avatar, // 👈 also use avatar as icon
				}));
			await sendMultipleNotification(notifications);
			Toast.show({ type: "success", text1: "Notifications prepared!" });
		} catch (err) {
			console.error(err);
			Toast.show({
				type: "error",
				text1: "Unable to  sent Notification.",
			});
		} finally {
			setGlobalLoading(false);
		}
	};
	const onRefresh = async () => {
		setRefreshing(true);
		fetchTokens();
		setTimeout(() => setRefreshing(false), 2000);
	};
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		fetchTokens();
	}, []);
	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);

	/* -------------------------------------------------------------------------- */
	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: secondaryColor }]}
		>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 40} // adjust if header overlaps
			>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							color: textColor,
							marginBottom: 4,
						}}
					>
						Notification Fields
					</Text>

					<TextInput
						placeholder="Title"
						value={title}
						onChangeText={setTitle}
						placeholderTextColor="#999"
						className="bg-white text-black p-4 rounded-lg mb-4 pr-10"
					/>
					<TextInput
						placeholder="Body"
						value={body}
						onChangeText={setBody}
						placeholderTextColor="#999"
						className="bg-white text-black p-4 rounded-lg mb-4 pr-10"
					/>
					<TextInput
						placeholder="Subtitle"
						value={subtitle}
						onChangeText={setSubtitle}
						placeholderTextColor="#999"
						className="bg-white text-black p-4 rounded-lg mb-4 pr-10"
					/>
					<TextInput
						placeholder="Rich Content Image URL"
						value={richContent.image}
						onChangeText={(val) => setRichContent({ image: val })}
						placeholderTextColor="#999"
						className="bg-white text-black p-4 rounded-lg mb-4 pr-10"
					/>

					<Text
						style={{
							fontSize: 16,
							fontWeight: "bold",
							color: textColor,
							marginVertical: 4,
						}}
					>
						Category
					</Text>
					<View
						style={{
							backgroundColor: cardsColor,
							borderRadius: 10,
							overflow: "hidden",
							marginBottom: 12,
						}}
					>
						<Picker
							selectedValue={category.categoryId}
							onValueChange={(val) =>
								setCategory({
									categoryId: val,
									categoryIdentifier: val,
								})
							}
							dropdownIconColor={textColor}
							dropdownIconRippleColor={cardsColor}
							mode="dialog"
						>
							{NOTIFICATION_TYPES.map((item, index) => (
								<Picker.Item
									key={`${item}+${index}`}
									label={item}
									value={item}
									style={{
										color: textColor,
										fontSize: 15,
										fontWeight: "900",
										backgroundColor: cardsColor,
									}}
								/>
							))}
						</Picker>
					</View>

					<Text
						style={{
							fontSize: 16,
							fontWeight: "bold",
							color: textColor,
							marginBottom: 6,
						}}
					>
						Data Fields (JSON)
					</Text>

					{dataFields.map((field, index) => (
						<View
							key={index}
							style={{
								flexDirection: "row",
								gap: 6,
								marginBottom: 6,
							}}
						>
							<TextInput
								placeholder="Key"
								value={field.key}
								onChangeText={(k) =>
									updateDataField(index, k, field.value)
								}
								placeholderTextColor="#999"
								className="flex-1 bg-white text-black p-3 rounded-md mb-4 pr-3"
							/>
							<TextInput
								placeholder="Value"
								value={field.value}
								onChangeText={(v) =>
									updateDataField(index, field.key, v)
								}
								placeholderTextColor="#999"
								className="flex-1 bg-white text-black p-3 rounded-md mb-4 pr-3"
							/>
							<TouchableOpacity
								onPress={() => removeDataField(index)}
								style={{
									justifyContent: "center",
									paddingHorizontal: 6,
									paddingBottom: 13,
								}}
							>
								<MaterialIcons
									name="delete"
									size={24}
									color="red"
								/>
							</TouchableOpacity>
						</View>
					))}

					<TouchableOpacity
						onPress={addDataField}
						style={{ marginBottom: 12 }}
					>
						<Text
							style={{ color: primaryColor, fontWeight: "bold" }}
						>
							+ Add Field
						</Text>
					</TouchableOpacity>

					{/* Button to open user modal */}
					<View style={{ flexDirection: "row", marginBottom: 12 }}>
						<TouchableOpacity
							onPress={() => setShowUserModal(true)}
							style={{
								paddingVertical: 12,
								paddingHorizontal: 6,
								backgroundColor: primaryColor,
								borderRadius: 6,
								alignItems: "center",
								width: 120, // reduced width
								marginLeft: "auto", // push to right
							}}
						>
							<Text
								style={{
									color: cardsColor,
									fontWeight: "bold",
								}}
							>
								Select Users
							</Text>
						</TouchableOpacity>
					</View>

					<RoundedButton
						title="Send Notification"
						onPress={sendNotification}
					/>

					<Modal
						visible={showUserModal}
						animationType="fade"
						transparent
					>
						<View
							style={{
								flex: 1,
								backgroundColor: secondaryColor,
								justifyContent: "flex-start",
								paddingHorizontal: 16,
								paddingTop: 40,
							}}
						>
							{/* Header */}
							<View
								style={{
									backgroundColor: cardsColor,
									borderRadius: 10,
									paddingVertical: 14,
									paddingHorizontal: 16,
									marginBottom: 12,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Text
									style={{
										fontSize: 20,
										fontWeight: "700",
										color: textColor,
									}}
								>
									Select Users
								</Text>

								<TouchableOpacity
									onPress={() => setShowUserModal(false)}
								>
									<Ionicons
										name="close-circle"
										size={24}
										color={textColor}
									/>
								</TouchableOpacity>
							</View>

							{/* User List */}
							<FlatList
								data={list}
								keyExtractor={(item, index) =>
									item?.userId?.UID ?? `user-${index}`
								}
								keyboardShouldPersistTaps="handled"
								contentContainerStyle={{ paddingBottom: 16 }}
								ItemSeparatorComponent={() => (
									<View style={{ height: 8 }} />
								)}
								refreshControl={
									<RefreshControl
										colors={[primaryColor, textColor]}
										refreshing={refreshing}
										onRefresh={onRefresh}
										progressBackgroundColor={secondaryColor}
									/>
								}
								renderItem={({ item }: any) => {
									const selected = selectedUsers.includes(
										item?.userId?.UID
									);
									return (
										<TouchableOpacity
											onPress={() =>
												toggleUser(item?.userId?.UID)
											}
											onLongPress={() =>
												setDetailUser(item)
											} // <-- long press opens detail modal
											style={{
												flexDirection: "row",
												alignItems: "center",
												paddingVertical: 10,
												paddingHorizontal: 12,
												borderRadius: 8,
												backgroundColor: selected
													? primaryColor
													: cardsColor,
											}}
										>
											<Image
												source={{
													uri: item?.userId?.avatar,
												}}
												style={{
													width: 40,
													height: 40,
													borderRadius: 20,
													marginRight: 12,
												}}
											/>
											<Text
												style={{
													color: selected
														? cardsColor
														: textColor,
													fontWeight: selected
														? "600"
														: "400",
													fontSize: 16,
												}}
											>
												{item?.userId?.name}
											</Text>
										</TouchableOpacity>
									);
								}}
							/>

							<TouchableOpacity
								onPress={() => setShowUserModal(false)}
								style={{
									marginTop: 12,
									paddingVertical: 14,
									backgroundColor: primaryColor,
									borderRadius: 8,
									alignItems: "center",
									marginBottom: 20,
								}}
							>
								<Text
									style={{
										color: "#fff",
										fontWeight: "700",
										fontSize: 16,
									}}
								>
									Done
								</Text>
							</TouchableOpacity>
						</View>
					</Modal>

					{/* DETAIL MODAL */}
					<Modal
						visible={!!detailUser}
						animationType="slide"
						transparent
						onRequestClose={() => setDetailUser(null)}
					>
						<View
							style={{
								flex: 1,
								backgroundColor: transparentBackground,
								justifyContent: "center",
								padding: 20,
							}}
						>
							<View
								style={{
									backgroundColor: secondaryColor,
									borderRadius: 12,
									padding: 20,

									// 🔽 Shadow for iOS
									shadowColor: "#000",
									shadowOpacity: 0.1,
									shadowOffset: { width: 0, height: 2 },
									shadowRadius: 6,

									// 🔽 Elevation for Android
									elevation: 5,
								}}
							>
								{/* Header */}
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
										marginBottom: 16,
									}}
								>
									<Text
										style={{
											fontSize: 18,
											fontWeight: "700",
											color: textColor,
										}}
									>
										User Details
									</Text>
									<TouchableOpacity
										onPress={() => setDetailUser(null)}
									>
										<Ionicons
											name="close"
											size={24}
											color={textColor}
										/>
									</TouchableOpacity>
								</View>

								{detailUser && (
									<>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
											}}
										>
											<Image
												source={{
													uri: detailUser?.userId
														?.avatar,
												}}
												style={{
													width: 60,
													height: 60,
													borderRadius: 30,
													marginRight: 16,
												}}
											/>
											<View>
												<Text
													style={{
														fontSize: 18,
														fontWeight: "600",
														color: textColor,
													}}
												>
													{detailUser?.userId?.name}
												</Text>
												<Text
													style={{
														fontSize: 12,
														color: textColor,
														opacity: 0.7,
													}}
												>
													{detailUser?.userId?.UID}
												</Text>
											</View>
										</View>

										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
												alignItems: "center",
												marginTop: 16,
											}}
										>
											<Text
												style={{
													fontSize: 14,
													color: textColor,
													fontWeight: "500",
												}}
											>
												Notification Token
											</Text>

											<TouchableOpacity
												onPress={async () => {
													if (detailUser?.token) {
														await Clipboard.setStringAsync(
															detailUser.token
														);
														if (
															Platform.OS ===
															"android"
														) {
															// Toast.show({
															// 	type: "info",
															// 	text1: "Token copied to clipboard",
															// });
															ToastAndroid.show(
																"Token copied to clipboard",
																ToastAndroid.SHORT
															);
														} else {
															Alert.alert(
																"Copied",
																"Token copied to clipboard"
															);
														}
													}
												}}
												style={{ padding: 6 }}
											>
												<Ionicons
													name="copy"
													size={18}
													color={textColor}
												/>
											</TouchableOpacity>
										</View>

										<Text
											selectable
											style={{
												marginTop: 6,
												fontSize: 12,
												color: textColor,
												backgroundColor: cardsColor,
												padding: 10,
												borderRadius: 6,
											}}
										>
											{detailUser?.token || "—"}
										</Text>

										<TouchableOpacity
											onPress={() => {
												CustomAlert({
													title: "Delete Group",
													description:
														"Are you sure you want to delete this group?",
													confirmText: "Delete",
													onConfirm: async () => {
														try {
															const response: any =
																await deleteTokenByUserId(
																	detailUser
																		?.userId
																		?._id
																);

															if (
																response?.deletedToken
															) {
																Toast.show({
																	type: "success",
																	text1: "Token deleted successfully",
																});

																setDetailUser(
																	null
																);
																fetchTokens();
															} else {
																Toast.show({
																	type: "error",
																	text1: "Unable to delete token",
																});
															}
														} catch (error) {
															Toast.show({
																type: "error",
																text1: "Something went wrong",
															});
															console.error(
																"Delete token failed:",
																error
															);
														}
													},
													cancelText: "Cancel",
												});
											}}
											style={{
												marginTop: 20,
												backgroundColor: "#ef4444",
												paddingVertical: 12,
												borderRadius: 8,
												alignItems: "center",
												flexDirection: "row",
												justifyContent: "center",
												gap: 8,
											}}
										>
											<Ionicons
												name="trash"
												size={18}
												color="#fff"
											/>
											<Text
												style={{
													color: "#fff",
													fontWeight: "700",
												}}
											>
												Delete User
											</Text>
										</TouchableOpacity>
									</>
								)}
							</View>
						</View>
					</Modal>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default NotificationSenderScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 6,
		paddingHorizontal: 10,
		marginTop: 110,
	},
});

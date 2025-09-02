import Blob from "@/components/on-bording/blob";
import CustomAlert from "@/components/ui/CustomAlert";
import Loader from "@/components/ui/Loader";
import { getStatusStyle } from "@/constants/statuscode";
import { useImagePreview } from "@/contexts/ImagePreviewContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getUsersDetailsByID } from "@/services/admin.service";
import { deleteUser } from "@/services/auth.service";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ComplaintListScreen() {
	const router = useRouter();
	const isFocused = useIsFocused();
	const { userID } = useLocalSearchParams();
	const { setGlobalLoading } = useLoading();
	const { showImage } = useImagePreview();

	const { primaryColor, secondaryColor, cardsColor, textColor } =
		useAppTheme();
	/* -------------------------------------------------------------------------- */
	const [userDetails, setUserDetails] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	/* -------------------------------------------------------------------------- */
	const fetchComplaints = async () => {
		try {
			setLoading(true);
			const data = await getUsersDetailsByID(userID as string);

			setUserDetails(data);
		} catch (err) {
			console.error("Error fetching complaints:", err);
		} finally {
			setLoading(false);
		}
	};
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		fetchComplaints();
	}, [userID]);

	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	/* -------------------------------------------------------------------------- */

	if (loading) return <Loader />;
	return (
		<SafeAreaView
			className="flex-1 px-4 "
			style={{
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 60,
			}}
		>
			<LegendList
				estimatedItemSize={25}
				recycleItems
				data={userDetails?.complaints || []}
				keyExtractor={(item: any) => item._id}
				showsVerticalScrollIndicator={false}
				extraData={[cardsColor, textColor, primaryColor]}
				ItemSeparatorComponent={() => <View className="h-3" />}
				renderItem={({ item }) => (
					<Pressable
						className="p-4 rounded-xl"
						style={{ backgroundColor: cardsColor }}
						onPress={() =>
							router.push({
								pathname:
									"/(protected)/admin/users/edit-complaint/[id]",
								params: { id: item?._id },
							})
						}
					>
						<Text
							className="text-lg font-semibold mb-2"
							style={{ color: textColor }}
						>
							{item?.type}
						</Text>

						<View style={styles.imageRow}>
							{item?.beforeImage && (
								<TouchableOpacity
									style={styles?.imageHalfTouchable}
									activeOpacity={0.7}
								>
									<Image
										source={{ uri: item?.beforeImage }}
										style={styles?.imageHalf}
										resizeMode="cover"
									/>
								</TouchableOpacity>
							)}
							{item?.afterImage && (
								<TouchableOpacity
									style={styles.imageHalfTouchable}
									activeOpacity={0.7}
								>
									<Image
										source={{ uri: item?.afterImage }}
										style={styles.imageHalf}
										resizeMode="cover"
									/>
								</TouchableOpacity>
							)}
						</View>
						<Text
							style={[styles.status, getStatusStyle(item.status)]}
						>
							Status: {item?.status}
						</Text>
						<Text style={{ color: textColor }}>
							Complaint ID: {item?.cid}
						</Text>
						<Text style={{ color: textColor }}>
							Date: {new Date(item?.raisedDate).toLocaleString()}
						</Text>

						{item?.status === "Resolved" && (
							<Text style={{ color: textColor }}>
								Resolved By: {item?.resolvedBy?.name}
							</Text>
						)}
						{item?.status === "Assigned" && (
							<Text style={{ color: textColor }}>
								Assigned To: {item?.assignedTo?.name}
							</Text>
						)}
					</Pressable>
				)}
				ListEmptyComponent={
					<View
						style={{
							flex: 1,
							backgroundColor: secondaryColor,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Blob
							text={"No Complaint !"}
							iconName={"newspaper-sharp"}
						/>
					</View>
				}
				ListHeaderComponent={() => (
					<>
						<View
							className="w-full rounded-2xl p-4 mb-5 shadow-md"
							style={{ backgroundColor: cardsColor }}
						>
							{/* Top Row: Avatar + Name */}
							<View className="flex-row items-center justify-between">
								<View className="flex-row items-center">
									{userDetails?.avatar && (
										<Pressable
											onPress={() =>
												showImage(userDetails.avatar)
											}
										>
											<Image
												source={{
													uri: userDetails.avatar,
												}}
												className="w-20 h-20 rounded-full mr-4 border-2"
												style={{
													borderColor: primaryColor,
												}}
												resizeMode="cover"
											/>
										</Pressable>
									)}
									<View>
										<Text
											className="text-xl font-bold"
											style={{ color: textColor }}
										>
											{userDetails?.name}
										</Text>
										<Text
											style={{
												color: textColor,
												opacity: 0.8,
											}}
										>
											UID: {userDetails?.UID}
										</Text>
									</View>
								</View>
								<MaterialIcons
									name="delete-forever"
									size={30}
									color="#ff4d4d"
									onPress={() => {
										CustomAlert({
											title: "Delete User !",
											description:
												"Are you sure to delete user ? All the data of this user has deleted .",
											onConfirm: async () => {
												try {
													await deleteUser(
														userID.toString()
													);
													router.back();
												} catch (error) {
													console.log(
														"error on delete "
													);
												}
											},
										});
									}}
								/>
							</View>

							{/* Divider */}
							<View
								className="h-[1px] my-3"
								style={{
									backgroundColor: primaryColor,
								}}
							/>

							{/* Contact Info */}
							<View className="mb-2 flex-row items-center">
								<Ionicons
									name="mail"
									size={18}
									color="#f39c12"
									style={{ marginRight: 6 }}
								/>
								<Text style={{ color: textColor }}>
									{userDetails?.email}
								</Text>
							</View>

							<View className="mb-2 flex-row items-center">
								<Ionicons
									name="call"
									size={18}
									color="#27ae60"
									style={{ marginRight: 6 }}
								/>
								<Text style={{ color: textColor }}>
									{userDetails?.phoneNo}
								</Text>
							</View>

							{/* Address */}
							<View className="mb-2 flex-row items-center">
								<Ionicons
									name="location"
									size={18}
									color="#e74c3c"
									style={{ marginRight: 6 }}
								/>
								<Text
									style={{
										color: textColor,
										flexShrink: 1,
									}}
								>
									{userDetails?.doorNo}, {userDetails?.street}
									, {userDetails?.city}, {userDetails?.state}
								</Text>
							</View>

							{/* Groups */}
							{userDetails?.groups?.length > 0 && (
								<View className="mb-2 flex-row items-center ">
									<FontAwesome5
										name="user-shield"
										size={16}
										color="#2980b9"
										style={{ marginRight: 6 }}
									/>
									<Text
										style={{ color: textColor }}
										numberOfLines={1} // show only 1 line
										ellipsizeMode="tail"
									>
										{userDetails.groups
											.map((g: any) => g.name)
											.join(", ")}
									</Text>
								</View>
							)}
						</View>

						<Text
							className="text-xl font-semibold mb-3"
							style={{
								color: textColor,
							}}
						>
							Complaints for: {userDetails?.UID}
						</Text>
					</>
				)}
			/>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	status: {
		alignSelf: "flex-end",
		fontSize: 12,
		fontWeight: "bold",
		borderRadius: 12,
		paddingHorizontal: 10,
		paddingVertical: 4,
		overflow: "hidden",
		marginBottom: 8,
	},
	imageHalf: {
		flex: 1,
		height: "100%",
		width: "100%",
	},
	imageHalfTouchable: {
		flex: 1, // Ensure touchable area fills its half
	},
	imageRow: {
		flexDirection: "row",
		height: 160,
		borderRadius: 12,
		overflow: "hidden",
		marginBottom: 12,
	},
});

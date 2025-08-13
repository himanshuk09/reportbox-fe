import Blob from "@/components/on-bording/blob";
import Loader from "@/components/ui/Loader";
import { getStatusStyle } from "@/constants/statuscode";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getUsersDetailsByID } from "@/services/admin.service";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ComplaintListScreen() {
	const { userID } = useLocalSearchParams();
	const [userDetails, setUserDetails] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const { primaryColor, secondaryColor, cardsColor, textColor } =
		useAppTheme();
	const router = useRouter();
	const isFocused = useIsFocused();

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

	useEffect(() => {
		fetchComplaints();
	}, []);
	if (loading) return <Loader />;
	return (
		<SafeAreaView
			className="flex-1 px-4 pt-4"
			style={{
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 100,
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

						{item?.beforeImage && (
							<Image
								source={{ uri: item?.beforeImage }}
								className="w-full h-40 rounded-lg mb-3"
								resizeMode="cover"
							/>
						)}

						<Text
							style={[styles.status, getStatusStyle(item.status)]}
						>
							Status: {item.status}
						</Text>
						<Text style={{ color: textColor }}>
							Complaint ID: {item.cid}
						</Text>
						<Text style={{ color: textColor }}>
							Date: {new Date(item?.raisedDate).toLocaleString()}
						</Text>

						{item.status === "Resolved" && (
							<Text style={{ color: textColor }}>
								Resolved By: {item.resolvedBy}
							</Text>
						)}
						{item.status === "Assigned" && (
							<Text style={{ color: textColor }}>
								Assigned To: {item?.assignedTo}
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
						<Blob text={"Not Found !"} iconName={"alert-sharp"} />
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
								<View className="mb-2 flex-row items-center">
									<MaterialIcons
										name="group"
										size={18}
										color="#8e44ad"
										style={{ marginRight: 6 }}
									/>
									<Text style={{ color: textColor }}>
										{userDetails.groups
											.map((g: any) => g.name)
											.join(", ")}
									</Text>
								</View>
							)}

							{/* Rights */}
							{userDetails?.rights?.length > 0 && (
								<View className="flex-row items-center">
									<FontAwesome5
										name="user-shield"
										size={16}
										color="#2980b9"
										style={{ marginRight: 6 }}
									/>
									<Text style={{ color: textColor }}>
										{userDetails.rights
											.map((r: any) => r.name)
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
});

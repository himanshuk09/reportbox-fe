import Blob from "@/components/on-bording/blob";
// import { complaintsPosts } from "@/constants/posts";
import { getStatusStyle } from "@/constants/statuscode";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getMMKV, setMMKV } from "@/storage/mmkv";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, RefreshControl, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

const Notifications = () => {
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const [refreshing, setRefreshing] = useState(false);
	const [notification, setNotification] = useState<any[]>([]);

	const handleDelete = (rowKey: string) => {
		const newData = notification.filter((item) => item.id !== rowKey);
		setNotification(newData);
		setMMKV("notifications", newData); // Update MMKV after delete
	};

	const onRefresh = async () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 2000);
	};

	useEffect(() => {
		const storeNotification: any = getMMKV("notifications") || [];
		setNotification(storeNotification);
		setGlobalLoading(false);
	}, [isFocused, refreshing]);

	return (
		<View
			className="flex-1 px-4"
			style={{ marginTop: 110, backgroundColor: secondaryColor }}
		>
			<SwipeListView
				data={notification}
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
				ListHeaderComponent={
					<View className="flex-row items-center justify-between mb-4">
						<Text
							className="text-3xl text-center font-bold"
							style={{ color: textColor }}
						>
							Notifications
						</Text>
						<Ionicons
							name="notifications-outline"
							size={27}
							color={textColor}
						/>
					</View>
				}
				renderItem={({ item }) => (
					<Pressable
						className="flex-row rounded-xl shadow p-2 mb-3"
						style={{ backgroundColor: cardsColor }}
					>
						<Image
							source={{ uri: item.data.beforeImage }}
							className="rounded-md mr-3"
							resizeMode="cover"
							style={{ width: "35%", height: "100%" }}
						/>
						<View className="flex-1 my-1">
							<Text
								className="font-bold"
								style={{ color: textColor }}
							>
								Complaint ID:{" "}
								<Text
									style={{
										color: textColor,
										fontWeight: "400",
									}}
								>
									{item.data.cid}
								</Text>
							</Text>
							<Text
								className="text-sm mt-1"
								style={{ color: textColor }}
							>
								Date:{" "}
								{item.data.raisedDate
									? new Date(
											item.data.raisedDate.$date
										).toLocaleString()
									: item.receivedAt}
							</Text>
							<View
								className="mt-2 px-2 py-1 rounded-full self-start"
								style={getStatusStyle(item.data.status)}
							>
								<Text className="text-xs font-medium">
									{item.data.status}
								</Text>
							</View>
							<Text
								className="text-sm mt-2"
								style={{ color: textColor }}
							>
								{item.data.status === "Resolved"
									? `Resolved By: ${item.data.resolvedBy?.$oid ?? "N/A"}`
									: `Assigned To: ${item.data.assignedTo?.$oid ?? "N/A"}`}
							</Text>
						</View>
					</Pressable>
				)}
				renderHiddenItem={({ item }) => (
					<View className="flex-row justify-end items-center px-4 h-full rounded-xl">
						<Pressable
							onPress={() => handleDelete(item.id)}
							className="px-4 py-2 rounded-xl"
						>
							<MaterialIcons
								name="delete-sweep"
								size={30}
								color="red"
							/>
						</Pressable>
					</View>
				)}
				rightOpenValue={-75}
				stopRightSwipe={-200}
				disableRightSwipe
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
							text={"No Notification"}
							iconName={"notifications"}
						/>
					</View>
				}
				refreshControl={
					<RefreshControl
						colors={[primaryColor, textColor]}
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			/>
		</View>
	);
};

export default Notifications;

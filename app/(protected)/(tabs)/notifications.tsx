import Blob from "@/components/on-bording/blob";
import { getStatusStyle } from "@/constants/statuscode";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getMMKV, MMKV_KEYS, setMMKV } from "@/storage/mmkv";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, RefreshControl, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

const Notifications = () => {
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();

	/* -------------------------------------------------------------------------- */
	const [refreshing, setRefreshing] = useState(false);
	const [notification, setNotification] = useState<any[]>([]);
	const swipeListRef = useRef<SwipeListView<any>>(null);

	/* -------------------------------------------------------------------------- */
	const handleDelete = (rowKey: string) => {
		const newData = notification.filter((item) => item.id !== rowKey);
		setNotification(newData);
		setMMKV(MMKV_KEYS?.NOTIFICATION_KEY, newData); // Update MMKV after delete
	};

	const clearAllNotifications = () => {
		swipeListRef.current?.closeAllOpenRows(); // closes all open swipe rows
		setNotification([]);
		setMMKV(MMKV_KEYS?.NOTIFICATION_KEY, []);
	};

	/* -------------------------------------------------------------------------- */
	const ComplaintCard = ({ item }: any) => (
		<Pressable
			className="flex-row rounded-lg shadow p-2 mb-2"
			style={{
				backgroundColor: cardsColor,
				minHeight: 80,
			}}
		>
			<Image
				source={{ uri: item?.data?.beforeImage }}
				className="rounded-md mr-2"
				resizeMode="cover"
				style={{ width: "25%", height: 70 }}
			/>
			<View className="flex-1 my-1">
				<Text
					className="font-bold text-sm"
					style={{ color: textColor }}
				>
					Complaint ID:{" "}
					<Text
						style={{
							color: textColor,
							fontWeight: "400",
						}}
					>
						{item?.data?.cid}
					</Text>
				</Text>

				<Text className="text-xs mt-1" style={{ color: textColor }}>
					Date:{" "}
					{item?.data?.raisedDate
						? new Date(item.data.raisedDate).toLocaleString()
						: item.receivedAt}
				</Text>

				<View
					className="mt-1 px-2 py-0.5 rounded-full self-start"
					style={getStatusStyle(item.data.status)}
				>
					<Text className="text-[10px] font-medium">
						{item?.data?.status}
					</Text>
				</View>

				<Text className="text-xs mt-1" style={{ color: textColor }}>
					{item?.data?.status === "Resolved"
						? `Resolved By: ${item?.data?.resolvedBy?.name ?? "N/A"}`
						: `Assigned To: ${item?.data?.assignedTo?.name ?? "N/A"}`}
				</Text>
			</View>
		</Pressable>
	);

	const InfoCard = ({ item }: any) => {
		return (
			<Pressable
				className="flex-row items-center rounded-lg shadow p-3 mb-2"
				style={{
					backgroundColor: cardsColor,
					minHeight: 80,
				}}
			>
				{/* Image (optional) */}
				{item?.imageUrl && (
					<Image
						source={{ uri: item?.imageUrl }}
						className="rounded-md mr-3"
						resizeMode="cover"
						style={{ width: 70, height: 70 }}
					/>
				)}

				{/* Text Section */}
				<View className="flex-1">
					<Text
						className="font-bold text-base"
						style={{ color: textColor }}
						numberOfLines={1}
					>
						{item?.title ?? "Untitled"}
					</Text>

					{item?.body ? (
						<Text
							className="text-sm mt-1"
							style={{ color: textColor }}
							numberOfLines={2}
						>
							{item.body}
						</Text>
					) : null}
				</View>
			</Pressable>
		);
	};
	const renderItem = ({ item }: any) => {
		if (item?.categoryId === "complaint_update") {
			return <ComplaintCard item={item} />;
		} else if (item?.categoryId === "simple") {
			return <InfoCard item={item} />;
		} else {
			return <InfoCard item={item} />;
		}
	};
	const fetchNotificationhistroy = () => {
		const storeNotification: any =
			getMMKV(MMKV_KEYS?.NOTIFICATION_KEY) || [];
		setNotification(storeNotification.reverse());
		if (storeNotification.length == 0) {
			// Toast.show({ type: "info", text1: "No Notification Found" });
		}
	};
	const onRefresh = async () => {
		setRefreshing(true);
		fetchNotificationhistroy();
		setTimeout(() => setRefreshing(false), 2000);
	};
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		fetchNotificationhistroy();
		setGlobalLoading(false);
	}, [isFocused, refreshing]);
	/* -------------------------------------------------------------------------- */
	return (
		<View
			className="flex-1 px-4"
			style={{ marginTop: 110, backgroundColor: secondaryColor }}
		>
			<SwipeListView
				ref={swipeListRef}
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
						<View className="flex-row items-center">
							{notification.length > 0 && (
								<Pressable
									onPress={clearAllNotifications}
									className="px-3 py-1  rounded-md"
								>
									<Text
										className=" font-bold"
										style={{ color: textColor }}
									>
										Clear All
									</Text>
								</Pressable>
							)}
							<Ionicons
								name="notifications-outline"
								size={27}
								color={textColor}
								style={{ marginLeft: 10 }}
							/>
						</View>
					</View>
				}
				renderItem={renderItem}
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
						progressBackgroundColor={secondaryColor}
					/>
				}
			/>
		</View>
	);
};

export default Notifications;

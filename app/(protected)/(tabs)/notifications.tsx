import Blob from "@/components/on-bording/blob";
import { complaintsPosts } from "@/constants/posts";
import { getStatusStyle } from "@/constants/statuscode";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
const Notifications = () => {
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const router = useRouter();
	const [complaintsPost, setComplaintsPost] = useState<any>(
		complaintsPosts[0]
	);

	const handleDelete = (rowKey: string) => {
		const newData = complaintsPost.filter(
			(item: any) => item.id !== rowKey
		);
		setComplaintsPost(newData);
	};
	return (
		<View
			className="flex-1  px-4"
			style={{ marginTop: 110, backgroundColor: secondaryColor }}
		>
			<View className="flex-row items-center justify-between mb-4">
				<Text
					className="text-3xl  text-center font-bold"
					style={{
						color: textColor,
					}}
				>
					Notifications
				</Text>
				<Ionicons
					name="notifications-outline"
					size={27}
					color={textColor}
				/>
			</View>

			<SwipeListView
				data={complaintsPost}
				keyExtractor={(item: any) => item.id}
				contentContainerStyle={{ paddingBottom: 20 }}
				renderItem={({ item }: any) => (
					<Pressable
						className="flex-row rounded-xl shadow p-2 mb-3"
						style={{ backgroundColor: cardsColor }}
					>
						<Image
							source={{ uri: item.beforeImage }}
							className="rounded-md mr-3"
							resizeMode="cover"
							style={{ width: "35%", height: "100%" }}
						/>
						<View className="flex-1 my-3">
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
									{item.cid}
								</Text>
							</Text>
							<Text
								className="text-sm mt-1"
								style={{ color: textColor }}
							>
								Date: {item.date}
							</Text>
							<View
								className="mt-2 px-2 py-1 rounded-full self-start"
								style={getStatusStyle(item.status)}
							>
								<Text className="text-xs font-medium">
									{item.status}
								</Text>
							</View>
							<Text
								className="text-sm mt-2"
								style={{ color: textColor }}
							>
								{item.status === "Resolved"
									? `Resolved By: ${item.resolvedBy ?? "N/A"}`
									: `Assigned To: ${item.assignedTo ?? "N/A"}`}
							</Text>
						</View>
					</Pressable>
				)}
				renderHiddenItem={({ item }: any) => (
					<View className="flex-row justify-end items-center px-4  h-full rounded-xl">
						<Pressable
							onPress={() => handleDelete(item.id)}
							className="px-4 py-2  rounded-xl"
						>
							{/* <Text className="text-white font-bold">Delete</Text> */}
							<MaterialIcons
								name="delete-sweep"
								size={30}
								color="red"
							/>
						</Pressable>
					</View>
				)}
				rightOpenValue={-75} // how much to swipe left
				stopRightSwipe={-200} // stops at full swipe
				onRowOpen={(rowKey, rowMap) => {
					// Delete immediately when fully swiped
					// handleDelete(rowKey);
				}}
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
			/>
		</View>
	);
};

export default Notifications;

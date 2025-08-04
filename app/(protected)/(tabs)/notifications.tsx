import Blob from "@/components/on-bording/blob";
import { getStatusStyle } from "@/constants/statuscode";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
const Notifications = () => {
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const [complaintsPost, setComplaintsPost] = useState<any>([
		{
			id: "1",
			user: "MKKN08",
			userID: "MTNHB29",
			avatar: "https://randomuser.me/api/portraits/men/32.jpg",
			time: "32 minutes ago",
			beforeImage:
				"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
			afterImage:
				"https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			message: "Please collect Garbage for bla bla place",
			tag: ["#QuickAction"],
			location: "bla bla bla",
			afterResolvedMessage:
				"Garbage cleared successfully by Zone 4 volunteers.\nComplaint resolved in 6 hours. 🙌",

			like: true,
			timeline: [
				"15 Feb 2025, 9:00 AM",
				"15 Feb 2025, 10:30 AM",
				"15 Feb 2025, 3:00 PM",
			],
			feedback: "Quick and clean response. Thank you!",
			cid: "MDU34567",
			type: "Water Department",
			subtype: ["No Supply", "Dirty Water", "Leakage", "Low Pressure"],
			raisedDate: "28 May 2025, 9:15 AM",
			responseDate: "29 May 2025, 11:00 AM",
			resolvedDate: "29 May 2025, 4:20 PM",
			status: "Assigned",
			date: "2025-07-30",
			assignedTo: "Officer Sharma",
			resolvedBy: "blabla",
			assignedBy: "abc",
		},

		{
			id: "2",
			user: "AABB12",
			userID: "MTNHB30",
			avatar: "https://randomuser.me/api/portraits/women/45.jpg",
			time: "1 hour ago",
			beforeImage:
				"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
			afterImage:
				"https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			message: "Cleaning operation completed in Zone 3 by volunteers.",
			tag: "#CleanupDrive",

			like: false,
			timeline: [
				"15 Feb 2025, 9:00 AM",
				"15 Feb 2025, 10:30 AM",
				"15 Feb 2025, 3:00 PM",
			],
			feedback: "Quick and clean response. Thank you!",
			cid: "MDU34567",
			type: "Drainage Leakage",
			raisedDate: "28 May 2025, 9:15 AM",
			responseDate: "29 May 2025, 11:00 AM",
			resolvedDate: "29 May 2025, 4:20 PM",
			status: "Resolved",
			date: "2025-07-28",
			resolvedBy: "Engineer Mehta",
		},
	]);

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
						onPress={() =>
							router.push(`/complaints/view/${item.id}`)
						}
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
				rightOpenValue={-150} // how much to swipe left
				stopRightSwipe={-150} // stops at full swipe
				onRowOpen={(rowKey, rowMap) => {
					// Delete immediately when fully swiped
					handleDelete(rowKey);
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

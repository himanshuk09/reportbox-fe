import Blob from "@/components/on-bording/blob";
import { complaintsPosts } from "@/constants/posts";
import { getStatusStyle } from "@/constants/statuscode";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

const Notifications = () => {
	if (complaintsPosts.length === 0) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "#343232",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Blob text={"No Notification"} iconName={"notifications"} />
			</View>
		);
	}
	return (
		<View
			className="flex-1  px-4"
			style={{ marginTop: 110, backgroundColor: "#343232" }}
		>
			<View className="flex-row items-center justify-between mb-4">
				<Text className="text-3xl text-white text-center font-bold">
					Notifications
				</Text>
				<Ionicons name="notifications-outline" size={27} color="#ccc" />
			</View>

			<FlatList
				data={complaintsPosts}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ paddingBottom: 20 }}
				renderItem={({ item }) => (
					<Pressable
						className="flex-row bg-white rounded-xl shadow p-2 mb-3"
						onPress={() => router.push("/(protected)/complaints/1")}
					>
						<Image
							source={{ uri: item.beforeImage }}
							className="rounded-md mr-3"
							resizeMode="cover"
							style={{
								width: "35%",
								height: "100%",
							}}
						/>
						<View className="flex-1 my-3">
							<Text className="font-semibold text-gray-800">
								Complaint ID:{" "}
								<Text className="text-gray-600">
									{item.cid}
								</Text>
							</Text>
							<Text className="text-sm text-gray-500 mt-1">
								Date: {item.date}
							</Text>
							<View
								className={`mt-2 px-2 py-1 rounded-full self-start `}
								style={[getStatusStyle(item.status)]}
							>
								<Text className="text-xs font-medium">
									{item.status}
								</Text>
							</View>
							<Text className="text-sm text-gray-600 mt-2">
								{item.status === "Resolved"
									? `Resolved By: ${item.resolvedBy ?? "N/A"}`
									: `Assigned To: ${
											item.assignedTo ?? "N/A"
										}`}
							</Text>
						</View>
					</Pressable>
				)}
			/>
		</View>
	);
};

export default Notifications;

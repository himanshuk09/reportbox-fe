import { useAppTheme } from "@/hooks/useAppTheme";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const mockAssignedComplaints = [
	{
		id: "1",
		userID: "MTNHB30",
		beforeImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		afterImage: "",
		type: "Drainage Leakage",
		status: "Assigned",
		date: "2025-07-30",
		raisedDate: new Date("2025-05-28T09:15:00"),
		responseDate: new Date("2025-05-29T11:00:00"),
		resolvedDate: null,
		assignedTo: "Worker Ravi",
		resolvedBy: "Worker Ravi",
		assignedBy: "Officer Sharma",
	},
	// You can add more complaint objects here
];

const WorkerAssignedComplaintsScreen = () => {
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const handleComplaintPress = (complaint: any) => {
		router.push("/(protected)/admin/assigned/[complaintId]");
	};

	const renderComplaintCard = ({ item }: { item: any }) => (
		<TouchableOpacity
			onPress={() => handleComplaintPress(item)}
			className=" p-4 rounded-xl mb-3 flex-row items-center"
			style={{
				backgroundColor: cardsColor,
			}}
		>
			<Image
				source={{ uri: item.beforeImage }}
				style={{
					width: 60,
					height: 60,
					borderRadius: 10,
					marginRight: 10,
				}}
			/>
			<View style={{ flex: 1 }}>
				<Text
					className=" font-bold text-lg"
					style={{
						color: textColor,
					}}
				>
					{item.type}
				</Text>
				<Text
					className=" text-sm"
					style={{
						color: textColor,
					}}
				>
					Assigned: {item.assignedBy}
				</Text>
				<Text
					className=" text-xs"
					style={{
						color: textColor,
					}}
				>
					Raised on: {new Date(item.raisedDate).toLocaleString()}
				</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View
			className="flex-1  p-4 pt-10"
			style={{
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 100,
			}}
		>
			<Text
				className=" text-2xl font-bold mb-4"
				style={{
					color: textColor,
				}}
			>
				Assigned Complaints
			</Text>
			<FlatList
				data={mockAssignedComplaints}
				keyExtractor={(item) => item.id}
				renderItem={renderComplaintCard}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default WorkerAssignedComplaintsScreen;

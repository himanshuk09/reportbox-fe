import { useNavigation } from "@react-navigation/native";
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
	const navigation = useNavigation();

	const handleComplaintPress = (complaint: any) => {
		router.push("/(protected)/admin/assigned/[complaintId]");
	};

	const renderComplaintCard = ({ item }: { item: any }) => (
		<TouchableOpacity
			onPress={() => handleComplaintPress(item)}
			className="bg-[#1e1e1e] p-4 rounded-xl mb-3 flex-row items-center"
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
				<Text className="text-white font-bold text-lg">
					{item.type}
				</Text>
				<Text className="text-gray-300 text-sm">
					Assigned: {item.assignedBy}
				</Text>
				<Text className="text-gray-400 text-xs">
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
				backgroundColor: "#343232",
				marginTop: 100,
			}}
		>
			<Text className="text-white text-2xl font-bold mb-4">
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

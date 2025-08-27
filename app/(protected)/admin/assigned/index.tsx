import Blob from "@/components/on-bording/blob";
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getAssignedComplaintsByUser } from "@/services/complaint.service";
import { LegendList } from "@legendapp/list";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

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
	const { user } = useAuth();
	const router = useRouter();

	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	/* -------------------------------------------------------------------------- */
	const [assignedComplaints, setAssignedComplaints] = useState([]);
	/* -------------------------------------------------------------------------- */
	const fetchAssignedComplaints = async () => {
		const response = await getAssignedComplaintsByUser(user.user._id);
		setAssignedComplaints(response);
	};
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		fetchAssignedComplaints();
	}, [user]);

	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	/* -------------------------------------------------------------------------- */
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

			<LegendList
				data={assignedComplaints}
				estimatedItemSize={25}
				recycleItems
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }: any) => (
					<TouchableOpacity
						onPress={() => {
							router.push({
								pathname:
									"/(protected)/admin/assigned/[complaintId]",
								params: {
									complaintId: item._id,
								},
							});
						}}
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
								Assigned: {item.assignedBy.name}
							</Text>
							<Text
								className=" text-xs"
								style={{
									color: textColor,
								}}
							>
								Raised on:{" "}
								{new Date(item.raisedDate).toLocaleString()}
							</Text>
						</View>
					</TouchableOpacity>
				)}
				extraData={[cardsColor, textColor, primaryColor]}
				ListEmptyComponent={
					<View
						style={{
							flex: 1,
							backgroundColor: secondaryColor,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Blob text={"No Assigned!"} iconName={"alert-sharp"} />
					</View>
				}
			/>
		</View>
	);
};

export default WorkerAssignedComplaintsScreen;

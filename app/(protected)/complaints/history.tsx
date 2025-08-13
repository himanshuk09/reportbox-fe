import ComplaintDetailModal from "@/components/complaints/ComplaintDetailModal";
import Blob from "@/components/on-bording/blob";
import Loader from "@/components/ui/Loader";
import { complaintsPosts } from "@/constants/posts";
import { useAuth } from "@/contexts/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getComplaintsByUserID } from "@/services/complaint.service";
import { LegendList } from "@legendapp/list";
import React, { useEffect, useState } from "react";
import { Image, Pressable, RefreshControl, Text, View } from "react-native";

const ComplaintCard = ({ item, setComplaint, setIsModalOpen }: any) => {
	const { primaryColor, secondaryColor, cardsColor, textColor } =
		useAppTheme();

	return (
		<Pressable
			className=" rounded-2xl shadow-sm mb-4  flex-row overflow-hidden"
			style={{
				backgroundColor: cardsColor,
			}}
			onPress={() => {
				setComplaint(item);
				setIsModalOpen(true);
			}}
		>
			<View className="flex-1 p-3 m-2">
				<Text
					className="font-semibold "
					style={{
						color: textColor,
					}}
				>
					Complaint ID:{" "}
					<Text
						style={{
							color: textColor,
						}}
					>
						#{item?.cid}
					</Text>
				</Text>
				<Text
					className="text-sm "
					style={{
						color: textColor,
					}}
				>
					Type: {item?.type}
				</Text>
				<Text
					className=" font-semibold mt-1"
					style={{ color: primaryColor }}
				>
					{item?.status}
				</Text>
			</View>
			{item?.beforeImage && (
				<Image
					source={{ uri: item?.beforeImage }}
					resizeMode="cover"
					style={{
						width: "45%",
						borderTopRightRadius: 12,
						borderBottomRightRadius: 12,
					}}
				/>
			)}
		</Pressable>
	);
};

const ComplaintHistoryScreen = () => {
	const { logout, user } = useAuth();
	const [complaintDetails, setComplaintDetails] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [complaintonModel, setComplaintModel] = useState([]);
	const { textColor, primaryColor, secondaryColor } = useAppTheme();
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const fetchAllComplaints = async () => {
		setLoading(true);
		const response = await getComplaintsByUserID(user?.user?._id);
		setComplaintDetails(response?.complaints);
		setLoading(false);
	};
	useEffect(() => {
		fetchAllComplaints();
	}, []);
	const onRefresh = async () => {
		setRefreshing(true);
		await fetchAllComplaints();
		setRefreshing(false);
	};
	if (loading) return <Loader />;
	return (
		<View
			className="flex-1  px-4 pt-6"
			style={{ marginTop: 110, backgroundColor: secondaryColor }}
		>
			<LegendList
				data={complaintDetails ?? complaintsPosts}
				estimatedItemSize={25}
				recycleItems
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				extraData={[textColor, primaryColor]}
				renderItem={({ item }) => (
					<ComplaintCard
						item={item}
						setComplaint={setComplaintModel}
						setIsModalOpen={setIsModalOpen}
					/>
				)}
				ListHeaderComponent={
					<Text
						className=" text-3xl text-center font-bold mb-4 "
						style={{
							color: primaryColor,
						}}
					>
						Complaint History
					</Text>
				}
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
				refreshControl={
					<RefreshControl
						colors={[primaryColor, textColor]}
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			/>
			<ComplaintDetailModal
				visible={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				complaint={complaintonModel}
			/>
		</View>
	);
};

export default ComplaintHistoryScreen;

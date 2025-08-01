import ComplaintDetailModal from "@/components/complaints/ComplaintDetailModal";
import { complaintsPosts } from "@/constants/posts";
import React, { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

const ComplaintCard = ({ item, setComplaint, setIsModalOpen }: any) => (
	<Pressable
		className="bg-white rounded-2xl shadow-sm mb-4  flex-row overflow-hidden"
		onPress={() => {
			setComplaint(item);
			setIsModalOpen(true);
		}}
	>
		<View className="flex-1 p-3 m-2">
			<Text className="font-semibold text-black">
				Complaint ID: <Text className="text-gray-700">#{item.cid}</Text>
			</Text>
			<Text className="text-sm text-gray-600">Type: {item.type}</Text>
			<Text className=" font-semibold mt-1" style={{ color: "green" }}>
				Resolved
			</Text>
		</View>
		<Image
			source={{ uri: item.beforeImage }}
			resizeMode="cover"
			style={{
				width: "45%",
				borderTopRightRadius: 12,
				borderBottomRightRadius: 12,
			}}
		/>
	</Pressable>
);

const ComplaintHistoryScreen = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [complaint, setComplaint] = useState([]);
	return (
		<View
			className="flex-1  px-4 pt-6"
			style={{ marginTop: 110, backgroundColor: "#343232" }}
		>
			<Text className=" text-3xl text-center font-bold mb-4 text-[#00eeff]">
				Complaint History
			</Text>
			<FlatList
				data={complaintsPosts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ComplaintCard
						item={item}
						setComplaint={setComplaint}
						setIsModalOpen={setIsModalOpen}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
			<ComplaintDetailModal
				visible={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				complaint={complaint}
			/>
		</View>
	);
};

export default ComplaintHistoryScreen;

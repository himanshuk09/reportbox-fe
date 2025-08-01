import { complaintsPosts } from "@/constants/posts";
import { getStatusStyle } from "@/constants/statuscode";
import { router, useLocalSearchParams } from "expo-router";
import {
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ComplaintListScreen() {
	const { userID } = useLocalSearchParams();

	const complaints = complaintsPosts.filter((c) => c.userID === userID);

	return (
		<SafeAreaView
			className="flex-1 px-4 pt-4"
			style={{
				padding: 16,
				backgroundColor: "#343232",
				marginTop: 100,
			}}
		>
			<Text className="text-xl font-semibold mb-3 text-white">
				Complaints for: {userID}
			</Text>
			{complaints.length === 0 ? (
				<View className="flex-1 justify-center items-center">
					<Text className="text-white font-bold text-2xl">
						No Complaint Found
					</Text>
				</View>
			) : (
				<FlatList
					data={complaints}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={() => <View className="h-3" />}
					renderItem={({ item }) => (
						<Pressable
							className="p-4 rounded-xl bg-[#1e1e1e]"
							onPress={() =>
								router.push({
									pathname:
										"/(protected)/admin/complaints/[complaintID]",
									params: {
										complaintID: "1",
									},
								})
							}
						>
							<Text className="text-lg font-semibold text-white mb-2">
								{item.type}
							</Text>

							<Image
								source={{ uri: item.beforeImage }}
								className="w-full h-40 rounded-lg mb-3"
								resizeMode="cover"
							/>

							<Text
								style={[
									styles.status,
									getStatusStyle(item.status),
								]}
							>
								Status: {item.status}
							</Text>
							<Text className="text-white">
								Complaint ID: {item.cid}
							</Text>
							<Text className="text-white">
								Date: {item.date}
							</Text>

							{item.status === "Resolved" && (
								<Text className="text-white">
									Resolved By: {item.resolvedBy}
								</Text>
							)}

							{item.status === "Assigned" && (
								<Text className="text-white">
									Assigned To: {item.assignedTo}
								</Text>
							)}
						</Pressable>
					)}
				/>
			)}
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	status: {
		alignSelf: "flex-end",
		fontSize: 12,
		fontWeight: "bold",
		borderRadius: 12,
		paddingHorizontal: 10,
		paddingVertical: 4,
		overflow: "hidden",
		marginBottom: 8,
	},
});

import Blob from "@/components/on-bording/blob";
import { complaintsPosts } from "@/constants/posts";
import { getStatusStyle } from "@/constants/statuscode";
import { useAppTheme } from "@/hooks/useAppTheme";
import { LegendList } from "@legendapp/list";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ComplaintListScreen() {
	const { userID } = useLocalSearchParams();

	const complaints = complaintsPosts.filter((c) => c.userID === userID);
	const { primaryColor, secondaryColor, cardsColor, textColor } =
		useAppTheme();
	const router = useRouter();
	return (
		<SafeAreaView
			className="flex-1 px-4 pt-4"
			style={{
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 100,
			}}
		>
			<Text
				className="text-xl font-semibold mb-3 "
				style={{
					color: textColor,
				}}
			>
				Complaints for: {userID}
			</Text>

			<LegendList
				estimatedItemSize={25}
				recycleItems
				data={complaints}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <View className="h-3" />}
				renderItem={({ item }) => (
					<Pressable
						className="p-4 rounded-xl "
						style={{
							backgroundColor: cardsColor,
						}}
						onPress={() =>
							router.push({
								pathname:
									"/(protected)/admin/users/edit-complaint/[id]",
								params: {
									complaintID: "1",
								},
							})
						}
					>
						<Text
							className="text-lg font-semibold  mb-2"
							style={{
								color: textColor,
							}}
						>
							{item.type}
						</Text>

						<Image
							source={{ uri: item.beforeImage }}
							className="w-full h-40 rounded-lg mb-3"
							resizeMode="cover"
						/>

						<Text
							style={[styles.status, getStatusStyle(item.status)]}
						>
							Status: {item.status}
						</Text>
						<Text
							style={{
								color: textColor,
							}}
						>
							Complaint ID: {item.cid}
						</Text>
						<Text
							style={{
								color: textColor,
							}}
						>
							Date: {item.date}
						</Text>

						{item.status === "Resolved" && (
							<Text
								style={{
									color: textColor,
								}}
							>
								Resolved By: {item.resolvedBy}
							</Text>
						)}

						{item.status === "Assigned" && (
							<Text
								style={{
									color: textColor,
								}}
							>
								Assigned To: {item.assignedTo}
							</Text>
						)}
					</Pressable>
				)}
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
			/>
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

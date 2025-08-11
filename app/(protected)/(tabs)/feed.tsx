import PostCard from "@/components/complaints/PostCard";
import Blob from "@/components/on-bording/blob";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getAllComplaints } from "@/services/complaint.service";
import { LegendList } from "@legendapp/list";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

const Feed = () => {
	const { secondaryColor, primaryColor } = useAppTheme();
	const [complaints, setComplaints] = useState([]);
	const [loading, setLoading] = useState(false);
	const isFocused = useIsFocused();
	const [refreshing, setRefreshing] = useState(false);
	const fetchComplaints = async () => {
		try {
			setLoading(true);
			const data = await getAllComplaints();
			setComplaints(data);
		} catch (err) {
			console.error("Error fetching complaints:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchComplaints();
	}, [isFocused]);

	const onRefresh = () => {
		setRefreshing(true);
		// do your data fetch
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	};
	if (loading) <FullScreenLoader />;
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: secondaryColor,
				paddingHorizontal: 6,
				paddingVertical: 6,
				marginTop: 100,
			}}
		>
			<LegendList
				data={complaints}
				recycleItems
				keyExtractor={(item: any) => item._id}
				renderItem={({ item }) => (
					<PostCard
						item={item}
						onLike={async (id: any) => {
							await fetchComplaints();
						}}
						onComment={async (id: any) => {
							await fetchComplaints();
						}}
						showviewMore={true}
					/>
				)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					marginTop: 20,
					padding: 6,
					paddingBottom: 100,
				}}
				automaticallyAdjustKeyboardInsets
				keyboardShouldPersistTaps={"handled"}
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
							text={"No Complaint yet !"}
							iconName={"alert-sharp"}
						/>
					</View>
				}
				refreshControl={
					<RefreshControl
						colors={[primaryColor, secondaryColor]}
						refreshing={refreshing}
						onRefresh={fetchComplaints}
					/>
				}
			/>
		</View>
	);
};

export default Feed;

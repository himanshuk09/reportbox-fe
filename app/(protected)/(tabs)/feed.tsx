import { PostCard } from "@/components/complaints/PostCard";
import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import { View } from "react-native";

import Blob from "@/components/on-bording/blob";
import { complaintsPosts } from "@/constants/posts";
import { LegendList } from "@legendapp/list";
const Feed = () => {
	const { secondaryColor } = useAppTheme();
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
				data={complaintsPosts}
				recycleItems
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<PostCard item={item} showviewMore={true} />
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
			/>
		</View>
	);
};

export default Feed;

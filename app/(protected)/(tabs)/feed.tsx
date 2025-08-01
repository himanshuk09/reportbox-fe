import { PostCard } from "@/components/complaints/PostCard";
import { complaintsPosts } from "@/constants/posts";
import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
// Dummy comment data for demonstration

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
			<FlatList
				data={complaintsPosts}
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
			/>
		</View>
	);
};

export default Feed;

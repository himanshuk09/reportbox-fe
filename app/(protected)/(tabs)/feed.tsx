import { PostCard } from "@/components/complaints/PostCard";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Animated,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
// Dummy comment data for demonstration
const dummyComments = [
	{
		id: "1",
		avatar: "https://randomuser.me/api/portraits/men/1.jpg",
		user: "John Doe",
		comment: "Great progress! Looks amazing.",
	},
	{
		id: "2",
		avatar: "https://randomuser.me/api/portraits/women/2.jpg",
		user: "Jane Smith",
		comment: "Wow, what a transformation!",
	},
	{
		id: "3",
		avatar: "https://randomuser.me/api/portraits/men/3.jpg",
		user: "Peter Jones",
		comment: "Inspiring work!",
	},
];
export const posts = [
	{
		id: "1",
		user: "MKKN08",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		time: "32 minutes ago",
		beforeImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		afterImage:
			"https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		message:
			"Garbage cleared successfully by Zone 4 volunteers.\nComplaint resolved in 6 hours. 🙌",
		tag: "#QuickAction",
		comments: dummyComments,
		like: true,
		timeline: [
			"15 Feb 2025, 9:00 AM",
			"15 Feb 2025, 10:30 AM",
			"15 Feb 2025, 3:00 PM",
		],
		feedback: "Quick and clean response. Thank you!",
	},
	{
		id: "2",
		user: "AABB12",
		avatar: "https://randomuser.me/api/portraits/women/45.jpg",
		time: "1 hour ago",
		beforeImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		afterImage:
			"https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		message: "Cleaning operation completed in Zone 3 by volunteers.",
		tag: "#CleanupDrive",
		comments: dummyComments,
		like: false,
		timeline: [
			"15 Feb 2025, 9:00 AM",
			"15 Feb 2025, 10:30 AM",
			"15 Feb 2025, 3:00 PM",
		],
		feedback: "Quick and clean response. Thank you!",
	},
	{
		id: "3",
		user: "MKKN08",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		time: "32 minutes ago",
		beforeImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		afterImage:
			"https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		message:
			"Garbage cleared successfully by Zone 4 volunteers.\nComplaint resolved in 6 hours. 🙌",
		tag: "#QuickAction",
		comments: dummyComments,
		like: true,
		timeline: [
			"15 Feb 2025, 9:00 AM",
			"15 Feb 2025, 10:30 AM",
			"15 Feb 2025, 3:00 PM",
		],
		feedback: "Quick and clean response. Thank you!",
	},
	{
		id: "4",
		user: "AABB12",
		avatar: "https://randomuser.me/api/portraits/women/45.jpg",
		time: "1 hour ago",
		beforeImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		afterImage:
			"https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		message: "Cleaning operation completed in Zone 3 by volunteers.",
		tag: "#CleanupDrive",
		comments: dummyComments,
		like: false,
		timeline: [
			"15 Feb 2025, 9:00 AM",
			"15 Feb 2025, 10:30 AM",
			"15 Feb 2025, 3:00 PM",
		],
		feedback: "Quick and clean response. Thank you!",
	},
];

const Feed = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#343232",
				paddingHorizontal: 6,
				paddingVertical: 6,
				marginTop: 100,
			}}
		>
			<FlatList
				data={posts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<PostCard
						item={item}
						showviewMore={true}
					/>
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


import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const posts = [
	{
		id: "1",
		user: "MKKN08",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		time: "32 minutes ago",
		beforeImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		afterImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		message:
			"Garbage cleared successfully by Zone 4 volunteers.\nComplaint resolved in 6 hours. 🙌",
		tag: "#QuickAction",
	},
	{
		id: "2",
		user: "AABB12",
		avatar: "https://randomuser.me/api/portraits/women/45.jpg",
		time: "1 hour ago",
		beforeImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		afterImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		message: "Cleaning operation completed in Zone 3 by volunteers.",
		tag: "#CleanupDrive",
	},
	{
		id: "3",
		user: "MKKN08",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		time: "32 minutes ago",
		beforeImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		afterImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		message:
			"Garbage cleared successfully by Zone 4 volunteers.\nComplaint resolved in 6 hours. 🙌",
		tag: "#QuickAction",
	},
	{
		id: "4",
		user: "AABB12",
		avatar: "https://randomuser.me/api/portraits/women/45.jpg",
		time: "1 hour ago",
		beforeImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		afterImage:
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		message: "Cleaning operation completed in Zone 3 by volunteers.",
		tag: "#CleanupDrive",
	},
];
const index = () => {
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
						avatar={item.avatar}
						user={item.user}
						time={item.time}
						beforeImage={item.beforeImage}
						afterImage={item.afterImage}
						message={item.message}
						tag={item.tag}
					/>
				)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					marginTop: 20,
					padding: 6,
				}}
			/>
		</View>
	);
};

export default index;
export function PostCard({
	avatar,
	user,
	time,
	beforeImage,
	afterImage,
	message,
	tag,
}: {
	avatar: string;
	user: string;
	time: string;
	beforeImage: string;
	afterImage: string;
	message: string;
	tag: string;
}) {
	return (
		<View style={styles.card}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.userInfo}>
					<Image source={{ uri: avatar }} style={styles.avatar} />
					<View>
						<Text style={styles.username}>{user}</Text>
						<Text style={styles.time}>{time}</Text>
					</View>
				</View>
				<Feather name="more-horizontal" size={20} color="white" />
			</View>

			{/* Images */}
			<View style={styles.imageRow}>
				<Image
					source={{ uri: beforeImage }}
					style={styles.imageHalf}
					resizeMode="cover"
				/>
				<Image
					source={{ uri: afterImage }}
					style={styles.imageHalf}
					resizeMode="cover"
				/>
			</View>

			{/* Message */}
			<Text style={styles.message}>{message}</Text>
			<Text style={styles.tag}>{tag}</Text>

			{/* Actions */}
			<View style={styles.actions}>
				<View style={styles.actionIcons}>
					<TouchableOpacity>
						<Ionicons
							name="thumbs-up-outline"
							size={20}
							color="#ccc"
							onPress={() =>
								router.push({
									pathname: "/(protected)/complaints/[id]",
									params: { id: "1" },
								})
							}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons
							name="chatbubble-outline"
							size={20}
							color="#ccc"
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons
							name="share-social-outline"
							size={20}
							color="#ccc"
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity>
					<Text style={styles.viewMore}>View more</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#1e1e1e",
		padding: 16,
		borderRadius: 16,
		marginBottom: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 12,
	},
	username: {
		color: "#fff",
		fontWeight: "600",
	},
	time: {
		color: "#aaa",
		fontSize: 12,
	},
	imageRow: {
		flexDirection: "row",
		height: 160,
		borderRadius: 12,
		overflow: "hidden",
		marginBottom: 12,
	},
	imageHalf: {
		flex: 1,
		height: "100%",
	},
	message: {
		color: "#fff",
		fontSize: 14,
		marginBottom: 4,
	},
	tag: {
		color: "#00bcd4",
		fontWeight: "bold",
		fontSize: 14,
		marginBottom: 12,
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	actionIcons: {
		flexDirection: "row",
		gap: 20,
	},
	viewMore: {
		color: "#00bcd4",
		fontSize: 14,
	},
});

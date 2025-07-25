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
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		message:
			"Garbage cleared successfully by Zone 4 volunteers.\nComplaint resolved in 6 hours. 🙌",
		tag: "#QuickAction",
		comments: dummyComments,
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
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		message: "Cleaning operation completed in Zone 3 by volunteers.",
		tag: "#CleanupDrive",
		comments: dummyComments,
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
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		message:
			"Garbage cleared successfully by Zone 4 volunteers.\nComplaint resolved in 6 hours. 🙌",
		tag: "#QuickAction",
		comments: dummyComments,
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
			"https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
		message: "Cleaning operation completed in Zone 3 by volunteers.",
		tag: "#CleanupDrive",
		comments: dummyComments,
		timeline: [
			"15 Feb 2025, 9:00 AM",
			"15 Feb 2025, 10:30 AM",
			"15 Feb 2025, 3:00 PM",
		],
		feedback: "Quick and clean response. Thank you!",
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
						comments={item.comments}
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
	comments,
}: {
	avatar: string;
	user: string;
	time: string;
	beforeImage: string;
	afterImage: string;
	message: string;
	tag: string;
	comments: { id: string; avatar: string; user: string; comment: string }[]; // Type for comments
}) {
	const [showComments, setShowComments] = useState(false);
	const animatedHeight = useRef(new Animated.Value(0)).current;

	const toggleComments = () => {
		setShowComments(!showComments);
		Animated.timing(animatedHeight, {
			toValue: showComments ? 0 : 1, // Animate to 0 for hidden, 1 for visible
			duration: 300,
			useNativeDriver: false, // Height animation typically requires useNativeDriver: false
		}).start();
	};

	const commentsMaxHeight = animatedHeight.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 300], // Adjust 300 to a suitable max height for your comments
	});
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
					<TouchableOpacity style={styles.actionButton}>
						<Ionicons
							name="thumbs-up-outline"
							size={20}
							color="#ccc"
						/>
						<Text style={styles.likeCount}>{1000}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.actionButton}
						onPress={toggleComments}
					>
						<Ionicons
							name="chatbubble-outline"
							size={20}
							color="#ccc"
						/>
						<Text className="text-white text-center p-1">1000</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons
							name="share-social-outline"
							size={20}
							color="#ccc"
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					onPress={() =>
						router.push({
							pathname: "/(protected)/complaints/[id]",
							params: { id: "1" },
						})
					}
				>
					<Text style={styles.viewMore}>View more</Text>
				</TouchableOpacity>
			</View>
			{/* Comments Section */}
			<Animated.View
				style={[
					styles.commentsSection,
					{ maxHeight: commentsMaxHeight },
				]}
			>
				{showComments && (
					<View>
						{/* Use the comments prop instead of dummyComments */}
						{comments.map((comment) => (
							<CommentItem key={comment.id} {...comment} />
						))}
					</View>
				)}
			</Animated.View>
		</View>
	);
}
// New component for individual comments
const CommentItem = ({
	avatar,
	user,
	comment,
}: {
	avatar: string;
	user: string;
	comment: string;
}) => (
	<View style={commentStyles.commentContainer}>
		<Image source={{ uri: avatar }} style={commentStyles.commentAvatar} />
		<View style={commentStyles.commentContent}>
			<Text style={commentStyles.commentUser}>{user}</Text>
			<Text style={commentStyles.commentText}>{comment}</Text>
		</View>
	</View>
);

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
	actionButton: {
		flexDirection: "row", // Arrange icon and text horizontally
		alignItems: "center", // Vertically align items in the center
		// If you want some space between the icon and text, you can add:
		gap: 4, // or marginHorizontal: 4 on the Text component
	},
	likeCount: {
		color: "white",
		fontSize: 14, // Adjust font size as needed
		// If you're using `p-px` for padding, that translates to `padding: 1`
		// but using `gap` on the parent is often cleaner for spacing between elements.
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
	commentsSection: {
		overflow: "hidden", // Crucial for `maxHeight` animation to work correctly
		marginTop: 10,
		borderTopWidth: 1,
		borderTopColor: "#333",
		paddingTop: 10,
	},
});
const commentStyles = StyleSheet.create({
	commentContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 10,
	},
	commentAvatar: {
		width: 30,
		height: 30,
		borderRadius: 15,
		marginRight: 10,
	},
	commentContent: {
		flex: 1,
	},
	commentUser: {
		color: "white",
		fontWeight: "bold",
		fontSize: 13,
		marginBottom: 2,
	},
	commentText: {
		color: "#ccc",
		fontSize: 13,
	},
});

import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
export function PostCard({
	avatar,
	user,
	time,
	beforeImage,
	afterImage,
	message,
	tag,
	comments,
	showviewMore = true,
}: {
	avatar: string;
	user: string;
	time: string;
	beforeImage: string;
	afterImage: string;
	message: string;
	tag: string;
	showviewMore?: boolean;
	comments: { id: string; avatar: string; user: string; comment: string }[];
}) {
	const [showComments, setShowComments] = useState(false);
	const animatedHeight = useRef(new Animated.Value(0)).current;
	const [showImageViewer, setShowImageViewer] = useState(false);
	const [currentImageUri, setCurrentImageUri] = useState("");
	const toggleComments = () => {
		setShowComments(!showComments);
		Animated.timing(animatedHeight, {
			toValue: showComments ? 0 : 1,
			duration: 300,
			useNativeDriver: false,
		}).start();
	};

	const commentsMaxHeight = animatedHeight.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 300],
	});
	// Function to open the image viewer
	const openImageViewer = (uri: string) => {
		setCurrentImageUri(uri);
		setShowImageViewer(true);
	};

	// Function to close the image viewer
	const closeImageViewer = () => {
		setShowImageViewer(false);
		setCurrentImageUri("");
	};
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
				<TouchableOpacity
					style={styles.imageHalfTouchable}
					onPress={() => openImageViewer(beforeImage)}
					activeOpacity={0.7}
				>
					<Image
						source={{ uri: beforeImage }}
						style={styles.imageHalf}
						resizeMode="cover"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.imageHalfTouchable}
					onPress={() => openImageViewer(afterImage)}
					activeOpacity={0.7}
				>
					<Image
						source={{ uri: afterImage }}
						style={styles.imageHalf}
						resizeMode="cover"
					/>
				</TouchableOpacity>
			</View>

			{/* Message */}
			<Text style={styles.message}>{message}</Text>
			<Text style={styles.tag}>{tag}</Text>

			{/* Actions */}
			<View style={styles.actions}>
				<View style={styles.actionIcons}>
					<TouchableOpacity
						style={styles.actionButton}
						onPress={() => openImageViewer(beforeImage)}
					>
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
				{showviewMore && (
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
				)}
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
			{/* Image Viewer Modal */}
			<Modal
				visible={showImageViewer}
				transparent={true} // Makes the background translucent
				onRequestClose={closeImageViewer} // For Android back button
				animationType="fade"
			>
				<View style={styles.imageViewerContainer}>
					<Image
						source={{ uri: currentImageUri }}
						style={styles.fullScreenImage}
						resizeMode="contain" // Use 'contain' to ensure the whole image is visible
					/>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={closeImageViewer}
					>
						<Ionicons name="close-circle" size={40} color="white" />
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
}

const CommentItem = ({
	avatar,
	user,
	comment,
}: {
	avatar: string;
	user: string;
	comment: string;
}) => (
	<View style={styles.commentContainer}>
		<Image source={{ uri: avatar }} style={styles.commentAvatar} />
		<View style={styles.commentContent}>
			<Text style={styles.commentUser}>{user}</Text>
			<Text style={styles.commentText}>{comment}</Text>
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
		flexDirection: "row",
		alignItems: "center",

		gap: 4,
	},
	likeCount: {
		color: "white",
		fontSize: 14,
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
		width: "100%",
	},
	imageHalfTouchable: {
		flex: 1, // Ensure touchable area fills its half
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
		overflow: "hidden",
		marginTop: 10,

		paddingTop: 10,
	},
	commentContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
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
	imageViewerContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.9)", // Dark translucent background
		justifyContent: "center",
		alignItems: "center",
	},
	fullScreenImage: {
		width: screenWidth * 0.9, // Make image slightly smaller than screen to give padding
		height: screenHeight * 0.8, // Adjust height
		// You might want to use Dimensions.get('window') for more precise sizing
		// or calculate based on image aspect ratio
	},
	closeButton: {
		position: "absolute",
		top: 50, // Adjust position as needed, considering SafeArea
		right: 20,
		zIndex: 1, // Ensure button is on top
		padding: 10, // Make touchable area larger
	},
});

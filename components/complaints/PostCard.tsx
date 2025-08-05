import { getStatusStyle } from "@/constants/statuscode";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function PostCard({
	item,
	showviewMore = true,
}: {
	item: any;
	showviewMore?: boolean;
}) {
	const [menuVisible, setMenuVisible] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const animatedHeight = useRef(new Animated.Value(0)).current;
	const [showImageViewer, setShowImageViewer] = useState(false);
	const [currentImageUri, setCurrentImageUri] = useState("");
	const { primaryColor, cardsColor, textColor, secondaryColor } =
		useAppTheme();
	const router = useRouter();
	const toggleComments = () => {
		setShowComments(!showComments);
		Animated.timing(animatedHeight, {
			toValue: showComments ? 0 : 1,
			duration: 500,
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
	//new comment
	const [newCommentText, setNewCommentText] = useState("");
	const [localComments, setLocalComments] = useState(item.comments || []);
	const handleAddComment = () => {
		if (!newCommentText.trim()) return;

		const newComment = {
			id: Date.now().toString(),
			avatar: item.avatar,
			user: item.user,
			comment: newCommentText.trim(),
		};

		setLocalComments((prev: any) => [...prev, newComment]);
		console.log("New comment added:", newComment);
		setNewCommentText("");
	};
	return (
		<Pressable
			style={[styles.card, { backgroundColor: cardsColor }]}
			onPress={() => {
				if (!showviewMore) return;
				router.push({
					pathname: "/(protected)/complaints/view/[id]",
					params: { id: "1" },
				});
			}}
		>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.userInfo}>
					<Image
						// source={{ uri: item.avatar }}
						source={{
							uri: "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
						}}
						resizeMode="cover"
						style={styles.avatar}
					/>
					<View>
						<Text style={{ color: textColor, fontWeight: "600" }}>
							{item.user}
						</Text>
						<Text
							style={{
								color: "#aaa",
								fontSize: 12,
							}}
						>
							{item.time}
						</Text>
					</View>
				</View>
				<Feather
					name="more-vertical"
					size={25}
					color={textColor}
					onPress={() => setMenuVisible(!menuVisible)}
				/>
				{menuVisible && (
					<View
						style={{
							position: "absolute",
							right: 0,
							top: 40,
							backgroundColor: secondaryColor,
							borderRadius: 8,
							paddingVertical: 4,
							paddingHorizontal: 8,
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 4,
							elevation: 5,
							borderWidth: 0.5,
							borderColor: "#ccc",
							width: 120,
							zIndex: 100,
						}}
					>
						<Pressable
							onPress={() => {
								setMenuVisible(false);
								router.push({
									pathname:
										"/(protected)/complaints/edit/[id]",
									params: { id: "1" },
								});
							}}
							style={{ paddingVertical: 8 }}
						>
							<Text
								style={{
									color: textColor,
									fontSize: 14,
									fontWeight: "500",
								}}
							>
								Edit
							</Text>
						</Pressable>

						<Pressable
							onPress={() => {
								setMenuVisible(false);
								// Your delete logic here
							}}
							style={{ paddingVertical: 8 }}
						>
							<Text
								style={{
									color: textColor,
									fontSize: 14,
									fontWeight: "500",
								}}
							>
								Delete
							</Text>
						</Pressable>
					</View>
				)}
			</View>

			{/* Images */}
			<View style={styles.imageRow}>
				{item.beforeImage && (
					<TouchableOpacity
						style={styles.imageHalfTouchable}
						onPress={() => openImageViewer(item.beforeImage)}
						activeOpacity={0.7}
					>
						<Image
							source={{ uri: item.beforeImage }}
							style={styles.imageHalf}
							resizeMode="cover"
						/>
					</TouchableOpacity>
				)}
				{item.afterImage && (
					<TouchableOpacity
						style={styles.imageHalfTouchable}
						onPress={() => openImageViewer(item.afterImage)}
						activeOpacity={0.7}
					>
						<Image
							source={{ uri: item.afterImage }}
							style={styles.imageHalf}
							resizeMode="cover"
						/>
					</TouchableOpacity>
				)}
			</View>

			{/* Message */}
			<Text style={[styles.message, { color: textColor }]}>
				{item.message}
			</Text>
			<Text style={styles.tag}>{item.tag}</Text>

			<Text style={[styles.status, getStatusStyle(item.status)]}>
				{item.status}
			</Text>
			{/* Actions */}
			<View style={styles.actions}>
				<View style={styles.actionIcons}>
					<TouchableOpacity style={styles.actionButton}>
						<Ionicons
							name={item.like ? "thumbs-up" : "thumbs-up-outline"}
							size={20}
							color={item.like ? primaryColor : textColor}
						/>
						<Text style={{ color: textColor, fontSize: 14 }}>
							{1000}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.actionButton}
						onPress={toggleComments}
					>
						<Ionicons
							name="chatbubble-outline"
							size={20}
							color={textColor}
						/>
						<Text style={{ color: textColor, fontSize: 14 }}>
							1000
						</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons
							name="share-social-outline"
							size={20}
							color={textColor}
						/>
					</TouchableOpacity>
				</View>
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
						{item.comments.map((comment: any) => (
							<CommentItem key={comment.id} {...comment} />
						))}
						<View style={styles.newCommentContainer}>
							<TextInput
								value={newCommentText}
								onChangeText={setNewCommentText}
								placeholder="Add a comment..."
								placeholderTextColor="#aaa"
								style={[
									styles.commentInput,
									{
										color: textColor,
										borderColor: primaryColor,
									},
								]}
							/>
							<TouchableOpacity
								onPress={handleAddComment}
								style={[
									styles.commentButton,
									{ backgroundColor: primaryColor },
								]}
							>
								<FontAwesome
									name="send"
									size={18}
									color={cardsColor}
								/>
							</TouchableOpacity>
						</View>
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
		</Pressable>
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
}) => {
	const { primaryColor, secondaryColor, textColor } = useAppTheme();

	return (
		<View style={styles.commentContainer}>
			<Image
				source={{
					uri: "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
				}}
				style={styles.commentAvatar}
			/>
			<View style={styles.commentContent}>
				<Text style={[styles.commentUser, { color: textColor }]}>
					{user}
				</Text>
				<Text style={{ color: textColor, fontSize: 13 }}>
					{comment}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		padding: 16,
		borderRadius: 16,
		marginBottom: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
		position: "relative",
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

	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 12,
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
		fontWeight: "bold",
		fontSize: 13,
		marginBottom: 2,
	},

	imageViewerContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.9)",
		justifyContent: "center",
		alignItems: "center",
	},
	fullScreenImage: {
		width: screenWidth * 0.9,
		height: screenHeight * 0.8,
	},
	closeButton: {
		position: "absolute",
		top: 50,
		right: 20,
		zIndex: 1,
		padding: 10,
	},
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
	newCommentContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 8,
	},
	commentInput: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginRight: 8,
		fontSize: 14,
	},
	commentButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
});

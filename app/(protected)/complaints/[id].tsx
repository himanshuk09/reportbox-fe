import { ScrollView, StyleSheet, Text, View } from "react-native";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import { PostCard } from "@/components/complaints/PostCard";
import { complaintsPosts } from "@/constants/posts";

export default function PostDetailsScreen() {
	const { id } = useLocalSearchParams();

	const post = complaintsPosts.find((p) => p.id === id);

	if (!post) return <Text>Post not found</Text>;
	const buildTimeline = (post: {
		raisedDate?: string;
		responseDate?: string;
		resolvedDate?: string;
	}) => {
		const timeline = [];

		if (post.raisedDate) {
			timeline.push({
				date: post.raisedDate,
				icon: "handshake",
			});
		} else {
			timeline.push({
				date: "-",
				icon: "handshake",
			});
		}
		if (post.responseDate) {
			timeline.push({
				date: post.responseDate,
				icon: "checkmark-done",
			});
		} else {
			timeline.push({
				date: "-",
				icon: "checkmark-done",
			});
		}
		if (post.resolvedDate) {
			timeline.push({
				date: post.resolvedDate,
				icon: "award",
			});
		} else {
			timeline.push({
				date: "-",
				icon: "award",
			});
		}

		return timeline;
	};

	return (
		<ScrollView
			style={{
				padding: 16,
				backgroundColor: "#343232",
				marginTop: 100,
			}}
			contentContainerStyle={{
				paddingBottom: 100,
			}}
		>
			{/* Timeline */}
			<View
				style={{
					backgroundColor: "#1e1e1e",
					borderRadius: 10,
					paddingVertical: 15,
				}}
			>
				<PostCard item={post} showviewMore={false} />

				{buildTimeline(post).map((step, index, arr) => (
					<View key={index} style={styles.timelineItem}>
						{/* Icon Circle & Lines */}
						<View style={styles.iconContainerWrapper}>
							{index > 0 && (
								<View style={styles.verticalLineTop} />
							)}
							{index < arr.length - 1 && (
								<View style={styles.verticalLineBottom} />
							)}

							<View style={styles.circle}>
								{step.icon === "handshake" && (
									<FontAwesome5
										name="handshake"
										size={18}
										color="#C0C0C0"
									/>
								)}
								{step.icon === "checkmark-done" && (
									<Ionicons
										name="checkmark-done"
										size={22}
										color="#C0C0C0"
									/>
								)}
								{step.icon === "award" && (
									<FontAwesome5
										name="award"
										size={18}
										color="#C0C0C0"
									/>
								)}
							</View>
						</View>

						{/* Label + Date */}

						<Text style={styles.timelineText}>{step.date}</Text>
					</View>
				))}
			</View>

			{/* Feedback */}
			<View
				style={{
					marginTop: 24,
					backgroundColor: "#e0f7fa",
					padding: 20,
					borderRadius: 12,
					alignItems: "center",
				}}
			>
				<Text
					style={{
						fontSize: 16,
						fontWeight: "bold",
						color: "#004d40",
						textAlign: "center",
					}}
				>
					{post.feedback}
				</Text>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1e1e1e", // Dark background as in the image
		paddingVertical: 20, // Some top/bottom padding
	},
	timelineItem: {
		flexDirection: "row",
		alignItems: "center",
		// justifyContent: "center",
		paddingHorizontal: 15,
		marginBottom: 16, // Space between timeline entries
		position: "relative", // For positioning the vertical line
		marginLeft: 20,
	},
	iconContainerWrapper: {
		width: 40,
		height: 40,
		marginRight: 12,
		alignItems: "center",
		justifyContent: "center",
		position: "relative", // Allows absolute positioning of lines relative to this wrapper
	},
	circle: {
		width: 40,
		height: 40,
		borderRadius: 20, // Half of width/height for a perfect circle
		backgroundColor: "#333", // Darker background for the circle
		alignItems: "center",
		justifyContent: "center",
		zIndex: 2, // Ensure circle is above lines
	},
	verticalLineTop: {
		position: "absolute",
		width: 2, // Thickness of the line
		backgroundColor: "#555", // Color of the line
		top: -16, // Start slightly above the circle
		height: 16, // Height to reach the circle
		left: "50%", // Center horizontally
		marginLeft: -1, // Adjust for line width to truly center
		zIndex: 1, // Below the circle
	},
	verticalLineBottom: {
		position: "absolute",
		width: 2, // Thickness of the line
		backgroundColor: "#555", // Color of the line
		bottom: -16, // End slightly below the circle
		height: 16, // Height to reach the next circle
		left: "50%", // Center horizontally
		marginLeft: -1, // Adjust for line width to truly center
		zIndex: 1, // Below the circle
	},
	timelineText: {
		color: "#fff", // White text for date/time
		fontSize: 16,
	},
});

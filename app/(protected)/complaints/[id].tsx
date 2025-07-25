import { ScrollView, StyleSheet, Text, View } from "react-native";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { PostCard } from "../(tabs)/dashboard";

const posts = [
	{
		timeline: [
			"15 Feb 2025, 9:00 AM",
			"15 Feb 2025, 10:30 AM",
			"15 Feb 2025, 3:00 PM",
		],
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
		feedback: "Quick and clean response. Thank you!",
	},
];

export default function PostDetailsScreen() {
	const { id } = useLocalSearchParams();

	const post = posts.find((p) => p.id === id);

	if (!post) return <Text>Post not found</Text>;

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
					marginTop: 20,
					backgroundColor: "#1e1e1e",
					borderRadius: 10,
					paddingVertical: 20,
				}}
			>
				<PostCard {...post} />
				{/* {post.timeline.map((entry, index) => (
					<View
						key={index}
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							marginBottom: 20,
						}}
					>
						<View
							style={{
								width: 40,
								height: 40,
								borderRadius: 30,
								backgroundColor: "#333",
								alignItems: "center",
								justifyContent: "center",
								marginRight: 12,
							}}
						>
							
							<View
								style={{
									// backgroundColor: "#1e1e1e",
									height: 30,
									width: 30,
									// borderRadius: 15,
									alignItems: "center",
									justifyContent: "center",
									// marginRight: 12,
								}}
							>
								<Text style={{ color: "#fff", fontSize: 12 }}>
									{index + 1}
								</Text>
							</View>
						</View>
						<Text style={{ color: "#fff" }}>{entry}</Text>
					</View>
				))} */}

				{post.timeline.map((entry, index) => (
					<View key={index} style={styles.timelineItem}>
						{/* Circle and Icon Container */}
						<View style={styles.iconContainerWrapper}>
							{/* Vertical line connector */}
							{index > 0 && (
								<View style={styles.verticalLineTop} />
							)}
							{index < post.timeline.length - 1 && (
								<View style={styles.verticalLineBottom} />
							)}

							<View style={styles.circle}>
								{/* Conditional Icons based on index or entry content */}
								{index === 0 && (
									<FontAwesome5
										name="handshake"
										size={18}
										color="#C0C0C0"
									/>
								)}
								{index === 1 && (
									<Ionicons
										name="checkmark-done"
										size={24}
										color="#C0C0C0"
									/>
								)}
								{index === 2 && (
									<FontAwesome5
										name="award"
										size={18}
										color="#C0C0C0"
									/>
								)}
								{/* Fallback if you want to show index number as in your original snippet */}
								{/*
                            {!(index === 0 || index === 1 || index === 2) && (
                                <Text style={{ color: "#fff", fontSize: 12 }}>
                                    {index + 1}
                                </Text>
                            )}
                            */}
							</View>
						</View>

						{/* Date and Time Text */}
						<Text style={styles.timelineText}>{entry}</Text>
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

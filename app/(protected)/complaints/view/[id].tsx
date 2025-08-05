import { PostCard } from "@/components/complaints/PostCard";
import { complaintsPosts } from "@/constants/posts";
import { useAppTheme } from "@/hooks/useAppTheme";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PostDetailsScreen() {
	const { id } = useLocalSearchParams();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
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
				backgroundColor: secondaryColor,
				marginTop: 100,
			}}
			contentContainerStyle={{
				paddingBottom: 100,
			}}
			showsVerticalScrollIndicator={false}
		>
			{/* Timeline */}
			<View
				style={{
					backgroundColor: cardsColor,
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
										color={primaryColor}
									/>
								)}
								{step.icon === "checkmark-done" && (
									<Ionicons
										name="checkmark-done"
										size={22}
										color={primaryColor}
									/>
								)}
								{step.icon === "award" && (
									<FontAwesome5
										name="award"
										size={18}
										color={primaryColor}
									/>
								)}
							</View>
						</View>

						{/* Label + Date */}

						<Text
							style={{
								color: textColor, // White text for date/time
								fontSize: 16,
								fontWeight: "500",
							}}
						>
							{step.date}
						</Text>
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
	timelineItem: {
		flexDirection: "row",
		alignItems: "center",

		paddingHorizontal: 15,
		marginBottom: 16,
		position: "relative",
		marginLeft: 20,
	},
	iconContainerWrapper: {
		width: 40,
		height: 40,
		marginRight: 12,
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	circle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#333",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 2,
	},
	verticalLineTop: {
		position: "absolute",
		width: 2,
		backgroundColor: "#555",
		top: -16,
		height: 16,
		left: "50%",
		marginLeft: -1,
		zIndex: 1,
	},
	verticalLineBottom: {
		position: "absolute",
		width: 2,
		backgroundColor: "#555",
		bottom: -16,
		height: 16,
		left: "50%",
		marginLeft: -1,
		zIndex: 1,
	},
});

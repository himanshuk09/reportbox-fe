import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function ComplaintDetailModal({
	visible,
	onClose,
	complaint,
}: any) {
	return (
		<Modal visible={visible} animationType="fade" transparent>
			<View className="flex-1 justify-center items-center bg-black/60 px-4">
				<View
					className="bg-white rounded-xl w-full p-4 max-w-md"
					style={{ zIndex: 1, elevation: 10 }} // <-- Android fix
				>
					<Pressable
						onPress={onClose}
						className="absolute top-3 right-3 p-1 z-10 rounded-full"
						style={{ zIndex: 10, elevation: 10 }} // <-- Ensure above all content
					>
						<Ionicons name="close" size={22} color="#333" />
					</Pressable>
					{/* Images */}
					<View style={styles.imageRow}>
						<TouchableOpacity
							style={styles.imageHalfTouchable}
							// onPress={() => openImageViewer(item.beforeImage)}
							activeOpacity={0.7}
						>
							<Image
								source={{ uri: complaint.beforeImage }}
								style={styles.imageHalf}
								resizeMode="cover"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.imageHalfTouchable}
							// onPress={() => openImageViewer(item.afterImage)}
							activeOpacity={0.7}
						>
							<Image
								source={{ uri: complaint.afterImage }}
								style={styles.imageHalf}
								resizeMode="cover"
							/>
						</TouchableOpacity>
					</View>

					{/* Complaint Info */}
					<Text className="font-bold text-sm text-gray-800">
						Complaint ID:{" "}
						<Text className="text-gray-900">{complaint.cid}</Text>
					</Text>
					<Text className="text-sm text-gray-700 mt-2">
						Raised On:{" "}
						<Text className="font-medium text-black">
							{complaint.raisedDate}
						</Text>
					</Text>
					<Text className="text-sm text-gray-700">
						Corporation Response:{" "}
						<Text className="font-medium text-black">
							{complaint.responseDate}
						</Text>
					</Text>
					<Text className="text-sm text-gray-700">
						Resolved On:{" "}
						<Text className="font-medium text-black">
							{complaint.resolvedDate}
						</Text>
					</Text>
				</View>
			</View>
		</Modal>
	);
}
const styles = StyleSheet.create({
	imageRow: {
		flexDirection: "row",
		height: 160,
		borderRadius: 12,
		overflow: "hidden",
		marginVertical: 35,
	},
	imageHalf: {
		flex: 1,
		height: "100%",
		width: "100%",
	},
	imageHalfTouchable: {
		flex: 1, // Ensure touchable area fills its half
	},
});

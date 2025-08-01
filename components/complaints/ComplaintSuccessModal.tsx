import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

export default function ComplaintSuccessModal({
	visible,
	onClose,
	onTrack,
}: any) {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View className="flex-1 items-center justify-center bg-black/60 px-4">
				<View
					className="w-full rounded-2xl  p-5 items-center space-y-4"
					style={{
						backgroundColor: "#eee",
					}}
				>
					{/* Close Button */}
					<Pressable
						onPress={onClose}
						className="absolute top-3 right-3 p-1 rounded-full"
					>
						<Ionicons name="close" size={22} color="#333" />
					</Pressable>

					{/* Check Icon */}
					<View className="bg-[#00eeff] p-4 rounded-full my-2">
						<Ionicons name="checkmark" size={32} color="white" />
					</View>

					{/* Title */}
					<Text className="text-center mb-2 font-bold text-2xl text-[#343232]">
						Complaint Submitted!
					</Text>

					{/* Description */}
					<Text className="text-center text-xs text-gray-700">
						You'll be notified as it progresses{"\n"}through
						resolution.
					</Text>

					{/* Complaint ID */}
					<Text className="text-center text-lg my-2 font-medium text-gray-900">
						Complaint ID:{" "}
						<Text className="font-bold">MDU45632</Text>
					</Text>

					{/* Track Button */}
					<Pressable
						onPress={onTrack}
						className="bg-[#00eeff] px-6 py-2.5 my-3 rounded-full"
					>
						<Text className="text-white font-semibold text-lg">
							Track Your Complaint
						</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

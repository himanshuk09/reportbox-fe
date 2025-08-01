import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GroupManagementHome = () => {
	const navigation = useNavigation();

	return (
		<View className="flex-1 bg-[#343232] p-6 pt-20">
			<Text className="text-white text-2xl font-bold mb-6">
				Group Management
			</Text>

			<TouchableOpacity
				className="bg-blue-600 py-4 rounded-xl mb-4"
				onPress={() =>
					router.push("/(protected)/admin/rights/create-groups")
				}
			>
				<Text className="text-white text-center text-lg">
					➕ Create Group
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="bg-green-600 py-4 rounded-xl mb-4"
				onPress={() =>
					router.push("/(protected)/admin/rights/assigned-rights")
				}
			>
				<Text className="text-white text-center text-lg">
					🔐 Assign Rights to Group
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="bg-purple-600 py-4 rounded-xl"
				onPress={() =>
					router.push("/(protected)/admin/rights/assigned-users")
				}
			>
				<Text className="text-white text-center text-lg">
					👥 Assign Users to Group
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default GroupManagementHome;

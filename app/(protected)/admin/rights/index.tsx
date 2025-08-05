import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GroupManagementHome = () => {
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const router = useRouter();
	return (
		<View
			style={{
				flex: 1,
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 90,
			}}
		>
			<Text
				className=" text-2xl font-bold mb-6"
				style={{
					color: textColor,
				}}
			>
				Group Management
			</Text>

			<TouchableOpacity
				className="bg-blue-600 py-4 rounded-xl mb-4"
				onPress={() => router.push("/(protected)/admin/rights/groups")}
			>
				<Text className="text-white text-center text-lg">
					➕ Create Group
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className="bg-blue-600 py-4 rounded-xl mb-4"
				onPress={() =>
					router.push("/(protected)/admin/rights/rights-keys")
				}
			>
				<Text className="text-white text-center text-lg">
					➕ Create Rights
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="bg-green-600 py-4 rounded-xl mb-4"
				onPress={() =>
					router.push(
						"/(protected)/admin/rights/group-rights-mapping"
					)
				}
			>
				<Text className="text-white text-center text-lg">
					🔐 Assign Rights to Group
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="bg-purple-600 py-4 rounded-xl"
				onPress={() =>
					router.push("/(protected)/admin/rights/group-user-mapping")
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

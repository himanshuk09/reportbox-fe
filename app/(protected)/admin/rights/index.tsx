import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const GroupManagementHome = () => {
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const router = useRouter();

	// Button config list
	const actions = [
		{
			label: "New Group Setup",
			icon: "➕",
			bgColor: primaryColor,
			path: "/(protected)/admin/rights/groups",
		},
		{
			label: "Define Access Rights",
			icon: "📜",
			bgColor: primaryColor,
			path: "/(protected)/admin/rights/rights-keys",
		},
		{
			label: "Assign Rights to Group",
			icon: "🔐",
			bgColor: "#28A745", // success green
			path: "/(protected)/admin/rights/group-rights-mapping",
		},
		{
			label: "Link Users to Group",
			icon: "👥",
			bgColor: "#6F42C1", // purple
			path: "/(protected)/admin/rights/group-user-mapping",
		},
	];

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
				className="text-2xl font-bold mb-6"
				style={{ color: textColor }}
			>
				Group Management
			</Text>

			<FlatList
				data={actions}
				keyExtractor={(item) => item.label}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={{
							backgroundColor: cardsColor,
							paddingVertical: 16,
							borderRadius: 12,
							marginHorizontal: 2,
							marginBottom: 12,
							shadowColor: primaryColor,
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.2,
							shadowRadius: 4,
							elevation: 4,
						}}
						onPress={() => router.push(item.path as any)}
					>
						<Text
							className="text-center text-lg font-medium"
							style={{ color: textColor }}
						>
							{item.icon} {item.label}
						</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default GroupManagementHome;

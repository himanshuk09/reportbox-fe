import { useAppTheme } from "@/hooks/useAppTheme";
import React, { useState } from "react";
import {
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock Data
const groups = ["Sanitation Team", "Water Team", "Admin Group"];

const allUsers = [
	{
		id: "u1",
		name: "Ravi",
		userID: "C101",
		phone: "9876543210",
		avatar: "https://i.pravatar.cc/150?u=u1",
	},
	{
		id: "u2",
		name: "Meena",
		userID: "C102",
		phone: "9876500011",
		avatar: "https://i.pravatar.cc/150?u=u2",
	},
	{
		id: "u3",
		name: "Ajay",
		userID: "C103",
		phone: "9998887776",
		avatar: "https://i.pravatar.cc/150?u=u3",
	},
	{
		id: "u4",
		name: "Priya",
		userID: "C104",
		phone: "7776665554",
		avatar: "https://i.pravatar.cc/150?u=u4",
	},
];

const AssignUsersToGroupScreen = () => {
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [groupAssignments, setGroupAssignments] = useState<{
		[groupName: string]: string[];
	}>({});
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const toggleUser = (userId: string) => {
		setSelectedUsers((prev) =>
			prev.includes(userId)
				? prev.filter((id) => id !== userId)
				: [...prev, userId]
		);
	};

	const handleAssign = () => {
		if (!selectedGroup) return alert("Please select a group");
		setGroupAssignments((prev) => ({
			...prev,
			[selectedGroup]: selectedUsers,
		}));
		alert(`Assigned to ${selectedGroup}`);
		setSelectedUsers([]);
	};

	const filteredUsers = allUsers.filter((u) => {
		const q = searchTerm.toLowerCase();
		return (
			u.userID.toLowerCase().includes(q) ||
			u.phone.includes(q) ||
			u.name.toLowerCase().includes(q)
		);
	});

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: secondaryColor,
				paddingVertical: 6,
				paddingHorizontal: 6,
				marginTop: 90,
			}}
		>
			<ScrollView
				contentContainerStyle={{
					paddingBottom: 30,
					padding: 6,
				}}
				showsVerticalScrollIndicator={false}
			>
				{/* Group Filter */}
				<Text
					className="text-lg font-semibold mt-6 mb-2"
					style={{
						color: textColor,
					}}
				>
					Select Group:
				</Text>
				<View className="flex-row flex-wrap gap-2 mb-10">
					{groups.map((group) => (
						<TouchableOpacity
							key={group}
							onPress={() => {
								setSelectedGroup(group);
								setSelectedUsers(groupAssignments[group] || []);
							}}
							className={`px-4 py-2 rounded-full `}
							style={{
								backgroundColor:
									selectedGroup === group
										? primaryColor
										: cardsColor,
							}}
						>
							<Text
								className=" font-bold"
								style={{
									color: textColor,
								}}
							>
								{group}
							</Text>
						</TouchableOpacity>
					))}
				</View>
				<Text
					className=" text-2xl font-bold mb-4"
					style={{
						color: textColor,
					}}
				>
					Assign Users to Group
				</Text>

				{/* Search */}
				<TextInput
					placeholder="Search by CID, phone or name..."
					placeholderTextColor="#999"
					className="bg-white text-black p-3 rounded-lg mb-4"
					value={searchTerm}
					onChangeText={setSearchTerm}
				/>

				{/* User List */}
				<Text
					className=" font-semibold text-lg mb-2"
					style={{
						color: textColor,
					}}
				>
					Select Users:
				</Text>

				<FlatList
					data={filteredUsers}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id}
					scrollEnabled={false}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => toggleUser(item.id)}
							className={`flex-row items-center gap-3 p-3 rounded-lg mb-3 `}
							style={{
								backgroundColor: selectedUsers.includes(item.id)
									? primaryColor
									: cardsColor,
							}}
						>
							<Image
								source={{ uri: item.avatar }}
								className="w-10 h-10 rounded-full"
							/>
							<View className="flex-1">
								<Text
									className=" font-semibold"
									style={{
										color: textColor,
									}}
								>
									{item.name}
								</Text>
								<Text
									className=" text-xs"
									style={{
										color: textColor,
									}}
								>
									UserID: {item.userID}
								</Text>
								<Text className="text-gray-500 text-xs">
									Phone: {item.phone}
								</Text>
							</View>
						</TouchableOpacity>
					)}
					ListEmptyComponent={
						<Text className="text-gray-400">No users found.</Text>
					}
				/>

				{/* Assign Button */}
				<TouchableOpacity
					className="bg-purple-700 mt-4 py-3 rounded-lg"
					onPress={handleAssign}
				>
					<Text className="text-white text-center font-bold">
						Assign Selected Users
					</Text>
				</TouchableOpacity>

				{/* Assignments Display */}
				{Object.keys(groupAssignments).length > 0 && (
					<View className="mt-6">
						<Text className="text-white text-xl font-semibold mb-2">
							Group Assignments
						</Text>
						{Object.entries(groupAssignments).map(
							([group, users]) => (
								<View
									key={group}
									className="bg-[#292929] p-3 mb-2 rounded-lg"
								>
									<Text className="text-white font-bold">
										{group}
									</Text>
									<Text className="text-gray-300 text-sm">
										{users.length > 0
											? users
													.map(
														(id) =>
															allUsers.find(
																(u) =>
																	u.id === id
															)?.name || id
													)
													.join(", ")
											: "No users assigned"}
									</Text>
								</View>
							)
						)}
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default AssignUsersToGroupScreen;

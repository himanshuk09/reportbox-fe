// import React, { useState } from "react";
// import { Alert, Text, TouchableOpacity, View } from "react-native";

// const users = ["Ravi", "Meena", "Ajay", "Priya"];
// const groups = ["Sanitation Team", "Water Team"];

// const AssignUsersToGroupScreen = () => {
// 	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
// 	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

// 	const toggleUser = (user: string) => {
// 		setSelectedUsers((prev) =>
// 			prev.includes(user)
// 				? prev.filter((u) => u !== user)
// 				: [...prev, user]
// 		);
// 	};

// 	const handleAssign = () => {
// 		if (!selectedGroup) {
// 			Alert.alert("Error", "Please select a group");
// 			return;
// 		}
// 		Alert.alert("Success", `Users assigned to ${selectedGroup}`);
// 	};

// 	return (
// 		<View className="flex-1 bg-[#343232] p-6 pt-20">
// 			<Text className="text-white text-2xl font-bold mb-4">
// 				Assign Users to Group
// 			</Text>

// 			<Text className="text-white mb-2">Select Group:</Text>
// 			{groups.map((group) => (
// 				<TouchableOpacity
// 					key={group}
// 					onPress={() => setSelectedGroup(group)}
// 					className={`p-3 rounded-lg mb-2 ${
// 						selectedGroup === group
// 							? "bg-purple-700"
// 							: "bg-[#1e1e1e]"
// 					}`}
// 				>
// 					<Text className="text-white">{group}</Text>
// 				</TouchableOpacity>
// 			))}

// 			<Text className="text-white mt-4 mb-2">Select Users:</Text>
// 			{users.map((user) => (
// 				<TouchableOpacity
// 					key={user}
// 					onPress={() => toggleUser(user)}
// 					className={`p-3 rounded-lg mb-2 ${
// 						selectedUsers.includes(user)
// 							? "bg-blue-600"
// 							: "bg-[#1e1e1e]"
// 					}`}
// 				>
// 					<Text className="text-white">{user}</Text>
// 				</TouchableOpacity>
// 			))}

// 			<TouchableOpacity
// 				className="bg-purple-700 mt-6 py-3 rounded-lg"
// 				onPress={handleAssign}
// 			>
// 				<Text className="text-white text-center font-bold">
// 					Assign Users
// 				</Text>
// 			</TouchableOpacity>
// 		</View>
// 	);
// };

// export default AssignUsersToGroupScreen;
// import React, { useState } from "react";
// import {
// 	FlatList,
// 	Text,
// 	TextInput,
// 	TouchableOpacity,
// 	View,
// } from "react-native";

// // Mock Data
// const groups = ["Sanitation Team", "Water Team", "Admin Group"];

// const allUsers = [
// 	{ id: "u1", name: "Ravi", userID: "C101", phone: "9876543210" },
// 	{ id: "u2", name: "Meena", userID: "C102", phone: "9876500011" },
// 	{ id: "u3", name: "Ajay", userID: "C103", phone: "9998887776" },
// 	{ id: "u4", name: "Priya", userID: "C104", phone: "7776665554" },
// ];

// const AssignUsersToGroupScreen = () => {
// 	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
// 	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
// 	const [searchTerm, setSearchTerm] = useState("");

// 	const [groupAssignments, setGroupAssignments] = useState<{
// 		[groupName: string]: string[];
// 	}>({});

// 	const toggleUser = (userId: string) => {
// 		setSelectedUsers((prev) =>
// 			prev.includes(userId)
// 				? prev.filter((id) => id !== userId)
// 				: [...prev, userId]
// 		);
// 	};

// 	const handleAssign = () => {
// 		if (!selectedGroup) {
// 			alert("Please select a group");
// 			return;
// 		}
// 		setGroupAssignments((prev) => ({
// 			...prev,
// 			[selectedGroup]: selectedUsers,
// 		}));
// 		alert(`Users assigned to ${selectedGroup}`);
// 		setSelectedUsers([]);
// 	};

// 	// Filter users by CID or phone
// 	const filteredUsers = allUsers.filter((u) => {
// 		const q = searchTerm.toLowerCase();
// 		return (
// 			u.userID.toLowerCase().includes(q) ||
// 			u.phone.includes(q) ||
// 			u.name.toLowerCase().includes(q)
// 		);
// 	});

// 	return (
// 		<View className="flex-1 bg-[#343232] p-6 pt-20">
// 			<Text className="text-white text-2xl font-bold mb-4">
// 				Assign Users to Group
// 			</Text>

// 			{/* Select Group */}
// 			<Text className="text-white mb-2">Select Group:</Text>
// 			{groups.map((group) => (
// 				<TouchableOpacity
// 					key={group}
// 					onPress={() => {
// 						setSelectedGroup(group);
// 						setSelectedUsers(groupAssignments[group] || []);
// 					}}
// 					className={`p-3 rounded-lg mb-2 ${
// 						selectedGroup === group
// 							? "bg-purple-700"
// 							: "bg-[#1e1e1e]"
// 					}`}
// 				>
// 					<Text className="text-white">{group}</Text>
// 				</TouchableOpacity>
// 			))}

// 			{/* Search Input */}
// 			<TextInput
// 				className="bg-white rounded-lg p-3 mb-4"
// 				placeholder="Search by CID or phone..."
// 				value={searchTerm}
// 				onChangeText={setSearchTerm}
// 			/>

// 			{/* Users List */}
// 			<Text className="text-white mb-2">Select Users:</Text>
// 			<FlatList
// 				data={filteredUsers}
// 				keyExtractor={(item) => item.id}
// 				renderItem={({ item }) => (
// 					<TouchableOpacity
// 						onPress={() => toggleUser(item.id)}
// 						className={`p-3 rounded-lg mb-2 ${
// 							selectedUsers.includes(item.id)
// 								? "bg-blue-600"
// 								: "bg-[#1e1e1e]"
// 						}`}
// 					>
// 						<Text className="text-white font-semibold">
// 							{item.name}
// 						</Text>
// 						<Text className="text-gray-300 text-sm">
// 							CID: {item.userID}
// 						</Text>
// 						<Text className="text-gray-400 text-xs">
// 							Phone: {item.phone}
// 						</Text>
// 					</TouchableOpacity>
// 				)}
// 				ListEmptyComponent={
// 					<Text className="text-gray-400">No users found.</Text>
// 				}
// 			/>

// 			{/* Assign Button */}
// 			<TouchableOpacity
// 				className="bg-purple-700 mt-6 py-3 rounded-lg"
// 				onPress={handleAssign}
// 			>
// 				<Text className="text-white text-center font-bold">
// 					Assign Users
// 				</Text>
// 			</TouchableOpacity>

// 			{/* Assigned Summary */}
// 			<Text className="text-white text-xl mt-8 font-semibold mb-2">
// 				Group Assignments:
// 			</Text>
// 			<FlatList
// 				data={Object.keys(groupAssignments)}
// 				keyExtractor={(item) => item}
// 				renderItem={({ item }) => (
// 					<View className="bg-[#1e1e1e] p-3 rounded-lg mb-2">
// 						<Text className="text-white font-bold">{item}</Text>
// 						<Text className="text-gray-300 text-sm">
// 							Users:{" "}
// 							{groupAssignments[item]
// 								.map((uid) => {
// 									const user = allUsers.find(
// 										(u) => u.id === uid
// 									);
// 									return user?.name || uid;
// 								})
// 								.join(", ") || "None"}
// 						</Text>
// 					</View>
// 				)}
// 			/>
// 		</View>
// 	);
// };

// export default AssignUsersToGroupScreen;
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
				backgroundColor: "#343232",
				paddingVertical: 6,
				paddingHorizontal: 6,
				marginTop: 90,
			}}
		>
			<ScrollView
				contentContainerStyle={{
					paddingBottom: 16,
					padding: 6,
				}}
				showsVerticalScrollIndicator={false}
			>
				{/* Group Filter */}
				<Text className="text-white text-lg font-semibold mt-6 mb-2">
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
							className={`px-4 py-2 rounded-full ${
								selectedGroup === group
									? "bg-[#00EEFF]"
									: "bg-[#333]"
							}`}
						>
							<Text className="text-white font-bold">
								{group}
							</Text>
						</TouchableOpacity>
					))}
				</View>
				<Text className="text-white text-2xl font-bold mb-4">
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
				<Text className="text-white font-semibold text-lg mb-2">
					Select Users:
				</Text>
				{filteredUsers.length > 0 ? (
					<FlatList
						data={filteredUsers}
						keyExtractor={(item) => item.id}
						scrollEnabled={false}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => toggleUser(item.id)}
								className={`flex-row items-center gap-3 p-3 rounded-lg mb-3 ${
									selectedUsers.includes(item.id)
										? "bg-blue-700"
										: "bg-[#2a2a2a]"
								}`}
							>
								<Image
									source={{ uri: item.avatar }}
									className="w-10 h-10 rounded-full"
								/>
								<View className="flex-1">
									<Text className="text-white font-semibold">
										{item.name}
									</Text>
									<Text className="text-gray-300 text-xs">
										UserID: {item.userID}
									</Text>
									<Text className="text-gray-400 text-xs">
										Phone: {item.phone}
									</Text>
								</View>
							</TouchableOpacity>
						)}
					/>
				) : (
					<Text className="text-gray-400">No users found.</Text>
				)}

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

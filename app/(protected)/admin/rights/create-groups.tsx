import React, { useState } from "react";
import {
	Alert,
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const CreateGroupScreen = () => {
	const [groupName, setGroupName] = useState("");
	const [groups, setGroups] = useState<string[]>([]);

	const handleCreate = () => {
		const trimmed = groupName.trim();
		if (!trimmed) {
			Alert.alert("Error", "Group name is required");
			return;
		}
		if (groups.includes(trimmed)) {
			Alert.alert("Duplicate", "Group already exists");
			return;
		}
		setGroups((prev) => [...prev, trimmed]);
		Alert.alert("Success", `Group '${trimmed}' created`);
		setGroupName("");
	};

	const renderGroupItem = ({ item }: { item: string }) => (
		<View className="bg-[#1e1e1e] p-3 rounded-lg mb-2">
			<Text className="text-white">{item}</Text>
		</View>
	);

	return (
		<View className="flex-1 bg-[#343232] p-6 pt-20">
			<Text className="text-white text-2xl font-bold mb-4">
				Create New Group
			</Text>

			<TextInput
				className="bg-white rounded-lg p-3 mb-4"
				placeholder="Enter group name"
				value={groupName}
				onChangeText={setGroupName}
			/>

			<TouchableOpacity
				className="bg-blue-600 py-3 rounded-lg mb-6"
				onPress={handleCreate}
			>
				<Text className="text-white text-center font-bold">
					Create Group
				</Text>
			</TouchableOpacity>

			<Text className="text-white text-xl font-semibold mb-2">
				Created Groups:
			</Text>

			<FlatList
				data={groups}
				keyExtractor={(item, index) => item + index}
				renderItem={renderGroupItem}
				ListEmptyComponent={
					<Text className="text-gray-400">
						No groups created yet.
					</Text>
				}
			/>
		</View>
	);
};

export default CreateGroupScreen;

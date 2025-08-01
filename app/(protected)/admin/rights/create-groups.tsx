import { useAppTheme } from "@/hooks/useAppTheme";
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
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
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
		<View
			className=" p-3 rounded-lg mb-2"
			style={{
				backgroundColor: cardsColor,
			}}
		>
			<Text
				style={{
					color: textColor,
				}}
			>
				{item}
			</Text>
		</View>
	);

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
				className="text-2xl font-bold mb-4"
				style={{
					color: textColor,
				}}
			>
				Create New Group
			</Text>

			<TextInput
				className="rounded-lg p-3 mb-4"
				placeholder="Enter group name"
				value={groupName}
				onChangeText={setGroupName}
				style={{
					backgroundColor: cardsColor,
					color: textColor,
				}}
			/>

			<TouchableOpacity
				className="bg-blue-600 py-3 rounded-lg mb-6"
				onPress={handleCreate}
			>
				<Text
					className=" text-center font-bold"
					style={{
						color: textColor,
					}}
				>
					Create Group
				</Text>
			</TouchableOpacity>

			<Text
				className="text-xl font-semibold mb-2"
				style={{
					color: textColor,
				}}
			>
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

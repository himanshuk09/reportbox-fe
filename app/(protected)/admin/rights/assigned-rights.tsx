import React, { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

const allGroups = ["Sanitation Team", "Water Team"];
const availableRights = ["View", "Resolve", "Delete", "Assign"];

type GroupRightsMap = { [groupName: string]: string[] };

const AssignRightsToGroupScreen = () => {
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
	const [selectedRights, setSelectedRights] = useState<string[]>([]);
	const [groupRights, setGroupRights] = useState<GroupRightsMap>({});

	const toggleRight = (right: string) => {
		setSelectedRights((prev) =>
			prev.includes(right)
				? prev.filter((r) => r !== right)
				: [...prev, right]
		);
	};

	const handleSubmit = () => {
		if (!selectedGroup) {
			Alert.alert("Error", "Please select a group");
			return;
		}
		setGroupRights((prev) => ({
			...prev,
			[selectedGroup]: selectedRights,
		}));
		Alert.alert("Assigned", `Rights updated for '${selectedGroup}'`);
		setSelectedRights([]);
	};

	const renderGroupRightsItem = ({ item }: { item: string }) => {
		const rights = groupRights[item] || [];
		return (
			<View className="bg-[#1e1e1e] p-3 rounded-lg mb-2">
				<Text className="text-white font-bold mb-1">{item}</Text>
				<Text className="text-gray-300">
					Rights:{" "}
					{rights.length > 0 ? rights.join(", ") : "None assigned"}
				</Text>
			</View>
		);
	};

	return (
		<View className="flex-1 bg-[#343232] p-6 pt-20">
			<Text className="text-white text-2xl font-bold mb-4">
				Assign Rights
			</Text>

			{/* Group Selection */}
			<Text className="text-white mb-2">Select Group:</Text>
			{allGroups.map((group) => (
				<TouchableOpacity
					key={group}
					onPress={() => {
						setSelectedGroup(group);
						setSelectedRights(groupRights[group] || []);
					}}
					className={`p-3 rounded-lg mb-2 ${
						selectedGroup === group ? "bg-blue-600" : "bg-[#1e1e1e]"
					}`}
				>
					<Text className="text-white">{group}</Text>
				</TouchableOpacity>
			))}

			{/* Rights Selection */}
			{selectedGroup && (
				<>
					<Text className="text-white mt-4 mb-2">Select Rights:</Text>
					{availableRights.map((right) => (
						<TouchableOpacity
							key={right}
							onPress={() => toggleRight(right)}
							className={`p-3 rounded-lg mb-2 ${
								selectedRights.includes(right)
									? "bg-green-600"
									: "bg-[#1e1e1e]"
							}`}
						>
							<Text className="text-white">{right}</Text>
						</TouchableOpacity>
					))}

					<TouchableOpacity
						className="bg-green-700 mt-4 py-3 rounded-lg"
						onPress={handleSubmit}
					>
						<Text className="text-white text-center font-bold">
							Assign Rights
						</Text>
					</TouchableOpacity>
				</>
			)}

			{/* Group Rights Display Section */}
			<Text className="text-white text-xl mt-8 mb-2 font-semibold">
				Groups & Assigned Rights
			</Text>
			<FlatList
				data={Object.keys(groupRights)}
				keyExtractor={(item) => item}
				renderItem={renderGroupRightsItem}
				ListEmptyComponent={
					<Text className="text-gray-400">
						No rights assigned yet.
					</Text>
				}
			/>
		</View>
	);
};

export default AssignRightsToGroupScreen;

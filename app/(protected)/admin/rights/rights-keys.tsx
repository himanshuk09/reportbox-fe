import { useAppTheme } from "@/hooks/useAppTheme";
import { LegendList } from "@legendapp/list";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

const CreateRightsScreen = () => {
	const [rightsName, setRightsName] = useState("");
	const [rights, setRights] = useState<string[]>([]);
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const handleCreate = () => {
		const trimmed = rightsName.trim();
		if (!trimmed) {
			Alert.alert("Error", "Rights name is required");
			return;
		}
		if (rights.includes(trimmed)) {
			Alert.alert("Duplicate", "Rights already exists");
			return;
		}
		setRights((prev) => [...prev, trimmed]);
		Alert.alert("Success", `Rights '${trimmed}' created`);
		setRightsName("");
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
				Create New Rights
			</Text>

			<TextInput
				className="rounded-lg p-3 mb-4"
				placeholder="Enter group name"
				value={rightsName}
				onChangeText={setRightsName}
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
					Create Rights
				</Text>
			</TouchableOpacity>

			<Text
				className="text-xl font-semibold mb-2"
				style={{
					color: textColor,
				}}
			>
				Created Rights:
			</Text>

			<LegendList
				data={rights}
				keyExtractor={(item, index) => item + index}
				renderItem={renderGroupItem}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<Text className="text-gray-400">
						No rights created yet.
					</Text>
				}
				estimatedItemSize={25}
				recycleItems
			/>
		</View>
	);
};

export default CreateRightsScreen;

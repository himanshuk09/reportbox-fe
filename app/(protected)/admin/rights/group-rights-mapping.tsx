import Blob from "@/components/on-bording/blob";
import { useAppTheme } from "@/hooks/useAppTheme";
import { LegendList } from "@legendapp/list";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const allGroups = ["Sanitation Team", "Water Team"];
const availableRights = ["View", "Resolve", "Delete", "Assign"];

type GroupRightsMap = { [groupName: string]: string[] };

const AssignRightsToGroupScreen = () => {
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
	const [selectedRights, setSelectedRights] = useState<string[]>([]);
	const [groupRights, setGroupRights] = useState<GroupRightsMap>({});
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
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
			<View
				className=" p-3 rounded-lg mb-2"
				style={{
					backgroundColor: cardsColor,
				}}
			>
				<Text
					className=" font-bold mb-1"
					style={{
						color: textColor,
					}}
				>
					{item}
				</Text>
				<Text className="text-gray-300">
					Rights:{" "}
					{rights.length > 0 ? rights.join(", ") : "None assigned"}
				</Text>
			</View>
		);
	};

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
				className=" text-2xl font-bold mb-4"
				style={{
					color: textColor,
				}}
			>
				Assign Rights
			</Text>

			{/* Group Selection */}
			<Text
				className=" mb-2"
				style={{
					color: textColor,
				}}
			>
				Select Group:
			</Text>
			{allGroups.map((group) => (
				<TouchableOpacity
					key={group}
					onPress={() => {
						setSelectedGroup(group);
						setSelectedRights(groupRights[group] || []);
					}}
					className={`p-3 rounded-lg mb-2`}
					style={{
						backgroundColor:
							selectedGroup === group ? primaryColor : cardsColor,
					}}
				>
					<Text
						style={{
							color: textColor,
						}}
					>
						{group}
					</Text>
				</TouchableOpacity>
			))}

			{/* Rights Selection */}
			{selectedGroup && (
				<>
					<Text
						className=" mt-4 mb-2"
						style={{
							color: textColor,
						}}
					>
						Select Rights:
					</Text>
					{availableRights.map((right) => (
						<TouchableOpacity
							key={right}
							onPress={() => toggleRight(right)}
							className={`p-3 rounded-lg mb-2 `}
							style={{
								backgroundColor: selectedRights.includes(right)
									? primaryColor
									: cardsColor,
							}}
						>
							<Text
								style={{
									color: textColor,
								}}
							>
								{right}
							</Text>
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
			<Text
				className=" text-xl mt-8 mb-2 font-semibold"
				style={{
					color: textColor,
				}}
			>
				Groups & Assigned Rights
			</Text>

			<LegendList
				data={Object.keys(groupRights)}
				estimatedItemSize={25}
				recycleItems
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				renderItem={renderGroupRightsItem}
				extraData={[cardsColor, textColor, primaryColor]}
				ListEmptyComponent={
					<View
						style={{
							flex: 1,
							backgroundColor: secondaryColor,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Blob text={"Not Found !"} iconName={"alert-sharp"} />
					</View>
				}
			/>
		</View>
	);
};

export default AssignRightsToGroupScreen;

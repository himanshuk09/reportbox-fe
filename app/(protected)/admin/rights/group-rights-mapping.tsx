import RoundedButton from "@/components/ui/RoundedButton";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	assignRightsToGroup,
	getRightsByGroupId,
} from "@/services/group-rights.service";
import { getGroups } from "@/services/group.service";
import { getRights } from "@/services/rights.service";
import { Ionicons } from "@expo/vector-icons"; // your custom theme hook
import { useIsFocused } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Modal,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
const AssignRightsToGroupScreen = () => {
	const [groups, setGroups] = useState<any[]>([]);
	const [allRights, setAllRights] = useState<any[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
	const [selectedRights, setSelectedRights] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [addedRights, setAddedRights] = useState<any[]>([]);
	const [removedRights, setRemovedRights] = useState<any[]>([]);
	const [groupRights, setGroupRights] = useState<string[]>([]);
	const [selectAll, setSelectAll] = useState(false);

	/* -------------------------------------------------------------------------- */
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	/* -------------------------------------------------------------------------- */
	// Fetch Rights
	const fetchRightsList = async () => {
		try {
			setLoading(true);
			const data = await getRights();
			setAllRights(data || []);
		} catch (err) {
			console.error("Error fetching rights:", err);
		} finally {
			setLoading(false);
		}
	};

	// Fetch Groups
	const fetchGroups = async () => {
		try {
			const response: any = await getGroups();
			setGroups(response || []);
		} catch (error) {
			console.log("Error on fetching groups", error);
		}
	};

	// Fetch Rights by Group ID
	const fetchRightsByGroupID = async (groupId: string) => {
		try {
			const response: any = await getRightsByGroupId(groupId);
			const ids = response.map((r: any) => r._id);
			setSelectedRights(ids); // current state
			setGroupRights(ids); // original state
		} catch (error) {
			console.log("Error on fetching group rights", error);
		}
	};

	const handlePreviewChanges = () => {
		if (!selectedGroup) {
			Toast.show({
				type: "error",
				text1: "Please select a group",
			});
			return;
		}

		// Calculate added/removed
		const added = allRights.filter(
			(r) =>
				selectedRights.includes(r._id) && !groupRights.includes(r._id)
		);
		const removed = allRights.filter(
			(r) =>
				!selectedRights.includes(r._id) && groupRights.includes(r._id)
		);

		setAddedRights(added);
		setRemovedRights(removed);
		setShowConfirm(true);
	};

	// Final Confirm
	const handleConfirmUpdate = async () => {
		setShowConfirm(false);
		try {
			setGlobalLoading(true);

			const payload = {
				groupId: selectedGroup._id,
				rightIds: selectedRights,
			};
			await assignRightsToGroup(payload);

			Toast.show({
				type: "success",
				text1: "Rights updated successfully!",
			});
			setGroupRights([...selectedRights]); // update local state
		} catch (error) {
			console.log("Error on assigning rights", error);
		} finally {
			setGlobalLoading(false);
		}
	};
	/* -------------------------------------------------------------------------- */

	const toggleRight = (rightId: string) => {
		setSelectedRights((prev) =>
			prev.includes(rightId)
				? prev.filter((id) => id !== rightId)
				: [...prev, rightId]
		);
	};

	const filteredRights = allRights.filter((r) => {
		const q = searchTerm.toLowerCase();
		return (
			r.code?.toLowerCase().includes(q) || // assuming rights have code/name
			r.name?.toLowerCase().includes(q)
		);
	});

	const presentRights = filteredRights.filter((r) =>
		selectedRights.includes(r._id)
	);
	const nonPresentRights = filteredRights.filter(
		(r) => !selectedRights.includes(r._id)
	);
	const toggleSelectAll = () => {
		if (selectAll) {
			setSelectedRights([]);
			setSelectAll(false);
		} else {
			setSelectedRights(allRights.map((r) => r._id));
			setSelectAll(true);
		}
	};

	// On Mount
	useEffect(() => {
		fetchRightsList();
		fetchGroups();
	}, []);
	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
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
			{loading ? (
				<View className="flex-1 justify-center items-center">
					<ActivityIndicator size="large" color={primaryColor} />
				</View>
			) : (
				<ScrollView
					contentContainerStyle={{
						paddingBottom: 30,
						padding: 6,
					}}
					showsVerticalScrollIndicator={false}
				>
					{/* Group Selector */}
					<Text
						className="text-lg font-semibold mt-6 mb-2"
						style={{ color: textColor }}
					>
						Select Group:
					</Text>
					<View className="flex-row flex-wrap gap-2 mb-10">
						{groups.map((group) => (
							<TouchableOpacity
								key={group._id}
								onPress={() => {
									setSelectedGroup(group);
									fetchRightsByGroupID(group._id);
								}}
								className="px-4 py-2 rounded-full"
								style={{
									backgroundColor:
										selectedGroup?._id === group._id
											? primaryColor
											: cardsColor,
								}}
							>
								<Text
									className="font-bold"
									style={{
										color:
											selectedGroup?._id === group._id
												? cardsColor
												: textColor,
									}}
								>
									{group.name}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					{/* Search */}
					<View className="relative">
						<TextInput
							placeholder="Search by right code or name..."
							placeholderTextColor="#999"
							className="bg-white text-black p-3 rounded-lg mb-4 pr-10"
							value={searchTerm}
							onChangeText={setSearchTerm}
						/>
						{searchTerm.length > 0 && (
							<TouchableOpacity
								className="absolute right-3 top-3"
								onPress={() => setSearchTerm("")}
							>
								<Ionicons
									name="close-circle"
									size={20}
									color="#999"
								/>
							</TouchableOpacity>
						)}
					</View>
					<View className="flex-row items-center mb-4">
						<Checkbox
							value={selectAll}
							onValueChange={toggleSelectAll}
							color={primaryColor}
							disabled={false}
						/>
						<Text className="ml-2 font-semibold text-lg">
							Select All Rights
						</Text>
					</View>
					{/* Non-Present Rights */}
					<Text
						className="font-semibold text-lg mb-2"
						style={{ color: textColor }}
					>
						Non-Present Rights:
					</Text>

					<FlatList
						data={nonPresentRights}
						keyExtractor={(item) => item._id}
						scrollEnabled={false}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => toggleRight(item._id)}
								className="flex-row items-center gap-3 p-3 rounded-lg mb-3"
								style={{ backgroundColor: cardsColor }}
							>
								<View className="flex-1">
									<Text
										className="font-semibold"
										style={{ color: textColor }}
									>
										{item.name}
									</Text>
								</View>
							</TouchableOpacity>
						)}
						ListEmptyComponent={
							<Text className="text-gray-400">
								No rights found.
							</Text>
						}
					/>

					{/* Present Rights */}
					<Text
						className="font-semibold text-lg mb-2 mt-6"
						style={{ color: textColor }}
					>
						Present Rights:
					</Text>
					<FlatList
						data={presentRights}
						keyExtractor={(item) => item._id}
						scrollEnabled={false}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => toggleRight(item._id)}
								className="flex-row items-center gap-3 p-3 rounded-lg mb-3"
								style={{ backgroundColor: primaryColor }}
							>
								<View className="flex-1">
									<Text
										className="font-semibold"
										style={{ color: cardsColor }}
									>
										{item.name}
									</Text>
								</View>
							</TouchableOpacity>
						)}
						ListEmptyComponent={
							<Text className="text-gray-400">
								No rights assigned yet.
							</Text>
						}
					/>
				</ScrollView>
			)}

			{/* Update Button */}
			<RoundedButton title={"Update"} onPress={handlePreviewChanges} />

			{/* Confirmation Modal */}
			<Modal
				visible={showConfirm}
				animationType="slide"
				transparent={true}
			>
				<View className="flex-1 justify-center items-center bg-black/60">
					<View className="bg-white p-5 rounded-2xl w-4/5">
						<Text className="text-lg font-bold mb-3">
							Confirm Changes
						</Text>

						<Text className="font-semibold text-green-600">
							Rights to Add:
						</Text>
						{addedRights.length > 0 ? (
							addedRights.map((r) => (
								<Text key={r._id}>
									+ {r.name} ({r.key})
								</Text>
							))
						) : (
							<Text className="text-gray-400">No new rights</Text>
						)}

						<Text className="font-semibold text-red-600 mt-3">
							Rights to Remove:
						</Text>
						{removedRights.length > 0 ? (
							removedRights.map((r) => (
								<Text key={r._id}>
									- {r.name} ({r.key})
								</Text>
							))
						) : (
							<Text className="text-gray-400">
								No rights removed
							</Text>
						)}

						<View className="flex-row justify-end gap-4 mt-5">
							<TouchableOpacity
								onPress={() => setShowConfirm(false)}
							>
								<Text className="text-gray-500">Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={handleConfirmUpdate}>
								<Text className="text-blue-600 font-bold">
									Confirm
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default AssignRightsToGroupScreen;

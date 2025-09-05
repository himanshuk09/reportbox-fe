import RoundedButton from "@/components/ui/RoundedButton";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getUsersList } from "@/services/admin.service";
import {
	assignUsersToGroup,
	getUsersByGroupId,
} from "@/services/group-user.service";
import { getGroups } from "@/services/group.service";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Image,
	Modal,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const AssignUsersToGroupScreen = () => {
	const [groups, setGroups] = useState<any[]>([]);
	const [allUsers, setAllUsers] = useState<any[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [addedUsers, setAddedUsers] = useState<any[]>([]);
	const [removedUsers, setRemovedUsers] = useState<any[]>([]);
	const [groupUsers, setGroupUsers] = useState<string[]>([]);

	/* -------------------------------------------------------------------------- */
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();

	/* -------------------------------------------------------------------------- */
	// Fetch Users
	const fetchUsersList = async () => {
		try {
			setLoading(true);
			const data = await getUsersList();
			setAllUsers(data || []);
		} catch (err) {
			console.error("Error fetching users:", err);
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

	const fetchUserByGroupID = async (groupId: string) => {
		try {
			const response: any = await getUsersByGroupId(groupId);
			const ids = response.map((u: any) => u._id);
			setSelectedUsers(ids); // current state
			setGroupUsers(ids); // original state
		} catch (error) {
			console.log("Error on fetching group users", error);
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
		const added = allUsers.filter(
			(u) => selectedUsers.includes(u._id) && !groupUsers.includes(u._id)
		);
		const removed = allUsers.filter(
			(u) => !selectedUsers.includes(u._id) && groupUsers.includes(u._id)
		);

		setAddedUsers(added);
		setRemovedUsers(removed);
		setShowConfirm(true);
	};

	// Final Confirm
	const handleConfirmUpdate = async () => {
		setShowConfirm(false);
		try {
			setGlobalLoading(true);
			const payload = {
				groupId: selectedGroup._id,
				userIds: selectedUsers,
			};
			await assignUsersToGroup(payload);

			Toast.show({
				type: "success",
				text1: "Users updated successfully!",
			});
			setGroupUsers([...selectedUsers]); // update local state
		} catch (error) {
			console.log("Error on assigning users", error);
			Toast.show({
				type: "error",
				text1: "Unable to Update!",
			});
		} finally {
			setGlobalLoading(false);
		}
	};

	const toggleUser = (userId: string) => {
		setSelectedUsers((prev) =>
			prev.includes(userId)
				? prev.filter((id) => id !== userId)
				: [...prev, userId]
		);
	};

	const filteredUsers = allUsers.filter((u) => {
		const q = searchTerm.toLowerCase();
		return (
			u.UID?.toLowerCase().includes(q) ||
			String(u.phoneNo ?? "").includes(q) || // safely handle undefined / number
			u.name?.toLowerCase().includes(q)
		);
	});

	const presentUsers = filteredUsers.filter((u) =>
		selectedUsers.includes(u._id)
	);
	const nonPresentUsers = filteredUsers.filter(
		(u) => !selectedUsers.includes(u._id)
	);
	/* -------------------------------------------------------------------------- */
	// On Mount
	useEffect(() => {
		fetchUsersList();
		fetchGroups();
	}, []);

	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	/* -------------------------------------------------------------------------- */
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
									fetchUserByGroupID(group._id);
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
							placeholder="Search by UID, phone or name..."
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
					{/* Non-Present Users */}
					<Text
						className="font-semibold text-lg mb-2"
						style={{ color: textColor }}
					>
						Non-Present Users:
					</Text>
					<FlatList
						data={nonPresentUsers}
						keyExtractor={(item) => item._id}
						scrollEnabled={false}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => toggleUser(item._id)}
								className="flex-row items-center gap-3 p-3 rounded-lg mb-3"
								style={{ backgroundColor: cardsColor }}
							>
								<Image
									source={{ uri: item.avatar }}
									className="w-10 h-10 rounded-full"
								/>
								<View className="flex-1">
									<Text
										className="font-semibold"
										style={{ color: textColor }}
									>
										{item.name}
									</Text>
									<Text
										className="text-xs"
										style={{ color: textColor }}
									>
										UID: {item.UID}
									</Text>
									<Text className="text-gray-500 text-xs">
										Phone: {item.phoneNo}
									</Text>
								</View>
							</TouchableOpacity>
						)}
						ListEmptyComponent={
							<Text className="text-gray-400">
								No users found.
							</Text>
						}
					/>

					{/* Present Users */}
					<Text
						className="font-semibold text-lg mb-2 mt-6"
						style={{ color: textColor }}
					>
						Present Users:
					</Text>
					<FlatList
						data={presentUsers}
						keyExtractor={(item) => item._id}
						scrollEnabled={false}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => toggleUser(item._id)}
								className="flex-row items-center gap-3 p-3 rounded-lg mb-3"
								style={{ backgroundColor: primaryColor }}
							>
								<Image
									source={{ uri: item.avatar }}
									className="w-10 h-10 rounded-full"
								/>
								<View className="flex-1">
									<Text
										className="font-semibold"
										style={{ color: cardsColor }}
									>
										{item.name}
									</Text>
									<Text
										className="text-xs"
										style={{ color: cardsColor }}
									>
										UID: {item.UID}
									</Text>
									<Text className="text-gray-700 text-xs">
										Phone: {item.phoneNo}
									</Text>
								</View>
							</TouchableOpacity>
						)}
						ListEmptyComponent={
							<Text className="text-gray-400">
								No users assigned yet.
							</Text>
						}
					/>
				</ScrollView>
			)}
			{/* Update Button */}
			<RoundedButton
				title={"Update"}
				onPress={handlePreviewChanges}
				disabled={
					selectedUsers.length === 0 ||
					JSON.stringify(selectedUsers.sort()) ===
						JSON.stringify(groupUsers.sort())
				}
			/>

			{/* Confirmation Modal */}
			<Modal
				visible={showConfirm}
				animationType="slide"
				transparent={true}
			>
				<View
					className="flex-1 justify-center items-center"
					style={{ backgroundColor: `${secondaryColor}99` }} // semi-transparent overlay
				>
					<View
						className="p-5 rounded-2xl w-4/5"
						style={{ backgroundColor: cardsColor }}
					>
						<Text
							className="text-lg font-bold mb-3"
							style={{ color: textColor }}
						>
							Confirm Changes
						</Text>

						<Text
							className="font-semibold mb-1"
							style={{ color: "green" }}
						>
							Users to Add:
						</Text>
						{addedUsers.length > 0 ? (
							addedUsers.map((u) => (
								<Text key={u._id} style={{ color: textColor }}>
									+ {u.name} ({u.UID})
								</Text>
							))
						) : (
							<Text className="text-gray-400">No new users</Text>
						)}

						<Text
							className="font-semibold mt-3 mb-1"
							style={{ color: "red" }}
						>
							Users to Remove:
						</Text>
						{removedUsers.length > 0 ? (
							removedUsers.map((u) => (
								<Text key={u._id} style={{ color: textColor }}>
									- {u.name} ({u.UID})
								</Text>
							))
						) : (
							<Text className="text-gray-400">
								No users removed
							</Text>
						)}

						<View className="flex-row justify-end gap-4 mt-5">
							<TouchableOpacity
								onPress={() => setShowConfirm(false)}
							>
								<Text style={{ color: textColor }}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={handleConfirmUpdate}
								style={{
									backgroundColor: primaryColor,
									paddingHorizontal: 16,
									paddingVertical: 6,
									borderRadius: 8,
								}}
							>
								<Text
									style={{
										color: cardsColor,
										fontWeight: "bold",
									}}
								>
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

export default AssignUsersToGroupScreen;

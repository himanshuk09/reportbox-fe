import CustomAlert from "@/components/ui/CustomAlert";
import RoundedButton from "@/components/ui/RoundedButton";
import { groupKeys } from "@/constants/rights";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	createGroup,
	deleteGroup,
	getGroups,
	updateGroup,
} from "@/services/group.service";
import { MaterialIcons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const CreateGroupScreen = () => {
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	/* -------------------------------------------------------------------------- */
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [groups, setGroups] = useState<any[]>([]);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [originalGroup, setOriginalGroup] = useState<any | null>(null);

	/* -------------------------------------------------------------------------- */
	const handleCreateOrUpdate = async () => {
		try {
			setGlobalLoading(true);
			if (editingId) {
				// Update group
				const response: any = await updateGroup(editingId, {
					name,
					description,
				});
				if (response.status) {
					Toast.show({
						type: "success",
						text1: "Group updated successfully.",
					});
					setEditingId(null);
					setName("");
					setDescription("");
					setOriginalGroup(null);
					await fetchGroups();
				}
			} else {
				// Create group
				const response: any = await createGroup({ name, description });
				if (response.status) {
					Toast.show({
						type: "success",
						text1: "Group created successfully.",
					});
					setName("");
					setDescription("");
					await fetchGroups();
				}
			}
		} catch (error) {
			Toast.show({
				type: "error",
				text1: editingId
					? "Unable to update group"
					: "Unable to create group",
			});
		} finally {
			setGlobalLoading(false);
		}
	};

	const fetchGroups = async () => {
		try {
			const response: any = await getGroups();
			setGroups(response);
		} catch (error) {
			console.log("Error on fetching groups", error);
		}
	};

	const handleEdit = (item: any) => {
		setEditingId(item._id);
		setName(item.name);
		setDescription(item.description);
		setOriginalGroup(item);
	};

	const handleDelete = (id: string) => {
		CustomAlert({
			title: "Delete Group",
			description: "Are you sure you want to delete this group?",
			confirmText: "Delete",
			onConfirm: async () => {
				try {
					const response: any = await deleteGroup(id);
					if (response.status) {
						Toast.show({
							type: "success",
							text1: "Group deleted successfully.",
						});
						await fetchGroups();
					}
				} catch (error) {
					Toast.show({
						type: "error",
						text1: "Unable to delete group",
					});
				}
			},
			cancelText: "Cancel",
		});
	};
	const renderGroupItem = ({ item }: any) => {
		const isProtected = groupKeys.includes(item?.name);

		return (
			<View
				className="p-3 rounded-lg mb-2"
				style={{
					backgroundColor: cardsColor,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<View style={{ flex: 1, marginRight: 8 }}>
					<Text style={{ color: textColor }}>{item?.name}</Text>
					<Text style={{ color: "#ccc" }}>{item?.description}</Text>
				</View>

				{!isProtected && (
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							onPress={() => handleEdit(item)}
							style={{ marginRight: 8 }}
						>
							<MaterialIcons
								name="edit"
								size={22}
								color={textColor}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => handleDelete(item._id)}
						>
							<MaterialIcons
								name="delete"
								size={22}
								color="red"
							/>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	};
	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		fetchGroups();
	}, []);

	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	/* -------------------------------------------------------------------------- */
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
				style={{ color: textColor }}
			>
				{editingId ? "Edit Group" : "Create New Group"}
			</Text>

			<TextInput
				className="rounded-lg p-3 mb-4"
				placeholder="Enter group name"
				placeholderTextColor={textColor}
				value={name}
				onChangeText={setName}
				style={{
					backgroundColor: cardsColor,
					color: textColor,
				}}
			/>
			<TextInput
				className="rounded-lg p-3 mb-4"
				placeholder="Add short description"
				placeholderTextColor={textColor}
				value={description}
				onChangeText={setDescription}
				style={{
					backgroundColor: cardsColor,
					color: textColor,
				}}
				numberOfLines={2}
			/>

			<RoundedButton
				title={editingId ? "Update Group" : "Create Group"}
				onPress={handleCreateOrUpdate}
				disabled={
					// Create mode: require both fields
					!name.trim() ||
					!description.trim() ||
					// Edit mode: disable if unchanged
					(editingId &&
						originalGroup &&
						name.trim() === originalGroup.name &&
						description.trim() ===
							(originalGroup.description || ""))
				}
			/>

			<Text
				className="text-xl font-semibold mb-2"
				style={{ color: textColor }}
			>
				Created Groups:
			</Text>

			<LegendList
				data={groups}
				estimatedItemSize={25}
				recycleItems
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				renderItem={renderGroupItem}
				extraData={[cardsColor, textColor, primaryColor]}
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

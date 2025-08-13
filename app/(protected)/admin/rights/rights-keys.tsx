// import RoundedButton from "@/components/ui/RoundedButton";
// import { useAppTheme } from "@/hooks/useAppTheme";
// import { createRights, getRights } from "@/services/rights.service";
// import { LegendList } from "@legendapp/list";
// import React, { useEffect, useState } from "react";
// import { Text, TextInput, View } from "react-native";
// import Toast from "react-native-toast-message";

// const CreateRightsScreen = () => {
// 	const [name, setName] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [rights, setRights] = useState<string[]>([]);
// 	const { primaryColor, secondaryColor, textColor, cardsColor } =
// 		useAppTheme();
// 	const handleCreate = async () => {
// 		try {
// 			const response: any = await createRights({ name, description });
// 			if (response.status) {
// 				Toast.show({
// 					type: "success",
// 					text1: "Rights created successfully.",
// 				});

// 				await fetchRights();
// 			}
// 		} catch (error) {
// 			Toast.show({
// 				type: "error",
// 				text1: "Rights to create group",
// 			});
// 		}
// 	};

// 	const fetchRights = async () => {
// 		try {
// 			const response: any = await getRights();
// 			console.log(response);
// 			setRights(response);
// 		} catch (error) {
// 			console.log("error on fetching groups");
// 		}
// 	};

// 	useEffect(() => {
// 		fetchRights();
// 	}, []);

// 	const renderRightsItem = ({ item }: any) => (
// 		<View
// 			className=" p-3 rounded-lg mb-2"
// 			style={{
// 				backgroundColor: cardsColor,
// 			}}
// 		>
// 			<Text
// 				style={{
// 					color: textColor,
// 				}}
// 			>
// 				{item?.name}
// 			</Text>
// 			<Text
// 				style={{
// 					color: "#ccc",
// 				}}
// 			>
// 				{item?.description}
// 			</Text>
// 		</View>
// 	);

// 	return (
// 		<View
// 			style={{
// 				flex: 1,
// 				padding: 16,
// 				backgroundColor: secondaryColor,
// 				marginTop: 90,
// 			}}
// 		>
// 			<Text
// 				className="text-2xl font-bold mb-4"
// 				style={{
// 					color: textColor,
// 				}}
// 			>
// 				Create New Rights
// 			</Text>

// 			<TextInput
// 				className="rounded-lg p-3 mb-4"
// 				placeholder="Enter group name"
// 				value={name}
// 				onChangeText={setName}
// 				style={{
// 					backgroundColor: cardsColor,
// 					color: textColor,
// 				}}
// 			/>
// 			<TextInput
// 				className="rounded-lg p-3 mb-4"
// 				placeholder="Add Short description."
// 				value={description}
// 				onChangeText={setDescription}
// 				style={{
// 					backgroundColor: cardsColor,
// 					color: textColor,
// 				}}
// 				numberOfLines={2}
// 			/>
// 			<RoundedButton title={"Create Rights"} onPress={handleCreate} />

// 			<Text
// 				className="text-xl font-semibold mb-2"
// 				style={{
// 					color: textColor,
// 				}}
// 			>
// 				Created Rights:
// 			</Text>

// 			<LegendList
// 				data={rights}
// 				keyExtractor={(item, index) => item + index}
// 				renderItem={renderRightsItem}
// 				showsVerticalScrollIndicator={false}
// 				extraData={[cardsColor, textColor, primaryColor]}
// 				ListEmptyComponent={
// 					<Text className="text-gray-400">
// 						No rights created yet.
// 					</Text>
// 				}
// 				estimatedItemSize={25}
// 				recycleItems
// 			/>
// 		</View>
// 	);
// };

// export default CreateRightsScreen;
import CustomAlert from "@/components/ui/CustomAlert";
import RoundedButton from "@/components/ui/RoundedButton";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
	createRights,
	deleteRight,
	getRights,
	updateRight,
} from "@/services/rights.service";
import { MaterialIcons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import React, { useEffect, useState } from "react";
import {
	Keyboard,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";

const CreateRightsScreen = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [rights, setRights] = useState<any[]>([]);
	const [editingId, setEditingId] = useState<string | null>(null);

	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();

	const fetchRights = async () => {
		try {
			const response: any = await getRights();
			setRights(response);
		} catch (error) {
			console.log("error on fetching rights");
		}
	};

	useEffect(() => {
		fetchRights();
	}, []);

	const handleCreateOrUpdate = async () => {
		if (editingId) {
			// Update
			try {
				await updateRight(editingId, { name, description });
				setRights((prev) =>
					prev.map((r) =>
						r._id === editingId ? { ...r, name, description } : r
					)
				);
				setEditingId(null);
				setName("");
				setDescription("");
				Keyboard.dismiss();
				Toast.show({
					type: "success",
					text1: "Rights updated successfully.",
				});
			} catch (error) {
				Toast.show({ type: "error", text1: "Unable to update rights" });
			}
		} else {
			// Create
			try {
				const response: any = await createRights({ name, description });
				if (response.status) {
					Toast.show({
						type: "success",
						text1: "Rights created successfully.",
					});
					await fetchRights();
					setName("");
					setDescription("");
				}
			} catch (error) {
				Toast.show({ type: "error", text1: "Unable to create rights" });
			}
		}
	};

	const handleDelete = (id: string) => {
		CustomAlert({
			title: "Delete Group",
			description: "Are you sure you want to delete this group?",
			confirmText: "Delete",
			onConfirm: async () => {
				try {
					await deleteRight(id);
					setRights((prev) => prev.filter((r) => r._id !== id));
					Toast.show({
						type: "success",
						text1: "Rights deleted successfully.",
					});
				} catch (error) {
					Toast.show({
						type: "error",
						text1: "Unable to delete rights",
					});
				}
			},
			cancelText: "Cancel",
		});
	};

	const renderRightsItem = ({ item }: any) => (
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
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					onPress={() => {
						setEditingId(item._id);
						setName(item.name);
						setDescription(item.description);
					}}
					style={{ marginRight: 8 }}
				>
					<MaterialIcons name="edit" size={22} color={textColor} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleDelete(item._id)}>
					<MaterialIcons name="delete" size={22} color="red" />
				</TouchableOpacity>
			</View>
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
				style={{ color: textColor }}
			>
				{editingId ? "Edit Rights" : "Create New Rights"}
			</Text>

			<TextInput
				className="rounded-lg p-3 mb-4"
				placeholder="Enter rights name"
				placeholderTextColor={textColor}
				value={name}
				onChangeText={setName}
				style={{ backgroundColor: cardsColor, color: textColor }}
			/>
			<TextInput
				className="rounded-lg p-3 mb-4"
				placeholder="Add short description."
				placeholderTextColor={textColor}
				value={description}
				onChangeText={setDescription}
				style={{ backgroundColor: cardsColor, color: textColor }}
				numberOfLines={2}
			/>

			<RoundedButton
				title={editingId ? "Update Rights" : "Create Rights"}
				onPress={handleCreateOrUpdate}
			/>

			<Text
				className="text-xl font-semibold mb-2 mt-4"
				style={{ color: textColor }}
			>
				Created Rights:
			</Text>

			<LegendList
				data={rights}
				keyExtractor={(item, index) => item._id || index.toString()}
				renderItem={renderRightsItem}
				showsVerticalScrollIndicator={false}
				extraData={[cardsColor, textColor, primaryColor]}
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

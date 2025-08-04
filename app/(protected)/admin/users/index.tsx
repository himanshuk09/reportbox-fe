import { complaintsPosts, users } from "@/constants/posts";
import { useAppTheme } from "@/hooks/useAppTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
	FlatList,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserListScreen() {
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const filteredUsers = useMemo(() => {
		return users
			.filter((user: any) => {
				const matchesSearch =
					user.userID.toLowerCase().includes(search.toLowerCase()) ||
					user.phoneNo.includes(search);

				const userComplaints = complaintsPosts.filter(
					(c) => c.userID === user.userID
				);

				const matchesType = typeFilter
					? userComplaints.some((c) => c.type === typeFilter)
					: true;
				const matchesStatus = statusFilter
					? userComplaints.some((c) => c.status === statusFilter)
					: true;

				return matchesSearch && matchesType && matchesStatus;
			})
			.map((user) => {
				const userComplaints = complaintsPosts.filter(
					(c) => c.userID === user.userID
				);
				return {
					...user,
					complaintCount: userComplaints.length,
				};
			});
	}, [search, typeFilter, statusFilter]);

	return (
		<SafeAreaView
			style={{
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 100,
				flex: 1,
			}}
		>
			<Text
				className="text-xl font-semibold  mb-2"
				style={{
					color: textColor,
				}}
			>
				User Complaints
			</Text>

			{/* Filters */}
			<View className="flex-row gap-2 mb-3">
				<View
					className="flex-1  rounded-lg px-3"
					style={{
						backgroundColor: cardsColor,
					}}
				>
					<TextInput
						placeholder="Search by User ID or Phone"
						value={search}
						onChangeText={setSearch}
						className="py-4 "
						style={{
							color: textColor,
						}}
					/>
				</View>
			</View>

			<View className="flex-row gap-2 mb-4">
				<View
					className="flex-1  rounded-lg"
					style={{
						backgroundColor: cardsColor,
					}}
				>
					<Picker
						selectedValue={typeFilter}
						onValueChange={(itemValue) => setTypeFilter(itemValue)}
					>
						<Picker.Item label="All Types" value="" />
						<Picker.Item
							label="Drainage Leakage"
							value="Drainage Leakage"
						/>
						<Picker.Item label="Garbage" value="Garbage" />
					</Picker>
				</View>

				<View
					className="flex-1  rounded-lg"
					style={{
						backgroundColor: cardsColor,
					}}
				>
					<Picker
						selectedValue={statusFilter}
						onValueChange={(itemValue) =>
							setStatusFilter(itemValue)
						}
					>
						<Picker.Item label="All Statuses" value="" />
						<Picker.Item label="Raised" value="Raised" />
						<Picker.Item label="Resolved" value="Resolved" />
						<Picker.Item label="Assigned" value="Assigned" />
						<Picker.Item label="Pending" value="Pending" />
					</Picker>
				</View>
			</View>

			{/* User List */}
			<FlatList
				data={filteredUsers}
				keyExtractor={(item) => item.userID}
				renderItem={({ item }) => (
					<View
						className="flex-row items-center p-3 mb-3  rounded-xl"
						style={{
							backgroundColor: cardsColor,
						}}
					>
						<Image
							source={{ uri: item.avtar }}
							className="w-14 h-14 rounded-full mr-4"
						/>
						<View className="flex-1">
							<Text
								className="text-base  font-semibold"
								style={{
									color: textColor,
								}}
							>
								{item.name}
							</Text>
							<Text
								style={{
									color: textColor,
								}}
							>
								User ID: {item.userID}
							</Text>
							<Text
								style={{
									color: textColor,
								}}
							>
								Complaints: {item.complaintCount}
							</Text>
						</View>
						<TouchableOpacity
							onPress={() =>
								router.push({
									pathname:
										"/(protected)/admin//users/[userID]" as any,
									params: {
										userID: item.userID ?? "MTNHB30",
									},
								})
							}
						>
							<MaterialIcons
								name="arrow-forward-ios"
								size={20}
								color={textColor}
							/>
						</TouchableOpacity>
					</View>
				)}
			/>
		</SafeAreaView>
	);
}

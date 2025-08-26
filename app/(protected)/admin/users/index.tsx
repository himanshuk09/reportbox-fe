import Blob from "@/components/on-bording/blob";
import Loader from "@/components/ui/Loader";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getUsersList } from "@/services/admin.service";
import { MaterialIcons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserListScreen() {
	const router = useRouter();
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();

	/* -------------------------------------------------------------------------- */
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState("");
	const [allUsers, setAllUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [statusFilter, setStatusFilter] = useState("");

	const filteredUsers = useMemo(() => {
		return allUsers
			?.filter((user: any) => {
				// ✅ Search by ID or phone
				const matchesSearch =
					user?._id
						.toString()
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					user.phoneNo?.toString().includes(search);

				// ✅ Filter by complaint type
				const matchesType = typeFilter
					? user.complaints.some((c: any) => c.type === typeFilter)
					: true;

				// ✅ Filter by complaint status
				const matchesStatus = statusFilter
					? user.complaints.some(
							(c: any) => c.status === statusFilter
						)
					: true;

				return matchesSearch && matchesType && matchesStatus;
			})
			.map((user: any) => ({
				...user,
				complaintCount: user.complaints.length, // ✅ Precomputed here
			}));
	}, [allUsers, search, typeFilter, statusFilter]);

	const fetchUsersList = async () => {
		try {
			setLoading(true);
			const data = await getUsersList();
			setAllUsers(data);
		} catch (err) {
			console.error("Error fetching complaints:", err);
		} finally {
			setLoading(false);
		}
	};

	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		fetchUsersList();
	}, []);

	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);

	/* -------------------------------------------------------------------------- */
	if (loading) return <Loader />;
	return (
		<SafeAreaView
			style={{
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 100,
				flex: 1,
			}}
		>
			{/* User List */}

			<LegendList
				data={filteredUsers}
				estimatedItemSize={25}
				recycleItems
				showsVerticalScrollIndicator={false}
				keyExtractor={(item: any) => item._id}
				extraData={[cardsColor, textColor, primaryColor]}
				ListHeaderComponent={
					<>
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
									placeholderTextColor={textColor}
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
									onValueChange={(itemValue) =>
										setTypeFilter(itemValue)
									}
								>
									<Picker.Item
										label="All Types"
										value=""
										color={textColor}
									/>
									<Picker.Item
										label="Drainage Leakage"
										value="Drainage Leakage"
										color={textColor}
									/>
									<Picker.Item
										label="Garbage"
										value="Garbage"
										color={textColor}
									/>
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
									<Picker.Item
										label="All Statuses"
										value=""
										color={textColor}
									/>
									<Picker.Item
										label="Raised"
										value="Raised"
										color={textColor}
									/>
									<Picker.Item
										label="Resolved"
										value="Resolved"
										color={textColor}
									/>
									<Picker.Item
										label="Assigned"
										value="Assigned"
										color={textColor}
									/>
									<Picker.Item
										label="Pending"
										value="Pending"
										color={textColor}
									/>
								</Picker>
							</View>
						</View>
					</>
				}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							router.push({
								pathname:
									"/(protected)/admin//users/[userID]" as any,
								params: {
									userID: item._id,
								},
							})
						}
						style={{
							backgroundColor: cardsColor,
						}}
						className="flex-row items-center p-3 mb-3  rounded-xl"
					>
						<Image
							source={{ uri: item.avatar }}
							className="w-14 h-14 rounded-full mr-4"
						/>
						<View className="flex-1">
							<Text
								className="text-base  font-semibold"
								style={{
									color: textColor,
								}}
							>
								{item?.name}
							</Text>
							<Text
								style={{
									color: textColor,
								}}
							>
								User ID: {item?.UID}
							</Text>
							<Text
								style={{
									color: textColor,
								}}
							>
								Complaints: {item?.complaints?.length}
							</Text>
						</View>

						<MaterialIcons
							name="arrow-forward-ios"
							size={20}
							color={textColor}
						/>
					</TouchableOpacity>
				)}
				ListEmptyComponent={
					<View
						style={{
							flex: 1,
							backgroundColor: secondaryColor,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Blob text={"Not Users !"} iconName={"people-sharp"} />
					</View>
				}
			/>
		</SafeAreaView>
	);
}

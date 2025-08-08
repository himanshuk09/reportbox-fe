import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { useAuth } from "@/contexts/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { router } from "expo-router";
import React from "react";
const menuItems = [
	{
		label: "Home",
		icon: "home-outline",
		path: "/(protected)/(tabs)/dashboard",
	},
	{ label: "Profile", icon: "person-outline", path: "/(protected)/profile" },
	{
		label: "Settings",
		icon: "settings-outline",
		path: "/(protected)/settings",
	},
	{
		label: "Complaint",
		icon: "chatbubble-ellipses-outline",
		path: "/(protected)/complaints",
	},
	{
		label: "Progress",
		icon: "trending-up-outline",
		path: "/(protected)/complaints/progress",
	},
	{
		label: "History",
		icon: "time-outline",
		path: "/(protected)/complaints/history",
	},
	{
		label: "All Users",
		icon: "people-outline",
		path: "/(protected)/admin/users",
	},
	{
		label: "Assigned",
		icon: "checkmark-done-outline",
		path: "/(protected)/admin/assigned",
	},
	{
		label: "Rights",
		icon: "shield-checkmark-outline",
		path: "/(protected)/admin/rights",
	},
	{
		label: "About US",
		icon: "information-circle",
		path: "/(protected)/admin/rights",
	},
];
const CustomDrawer = (props: any) => {
	const { logout, user } = useAuth();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();

	return (
		<View style={[styles.container, { backgroundColor: secondaryColor }]}>
			<View style={[styles.header, { borderBottomColor: textColor }]}>
				<Image
					source={{
						uri: user?.user?.avatar,
					}}
					style={styles.profileImage}
				/>
				<Text style={[styles.username, { color: textColor }]}>
					{user?.user?.name}
				</Text>
				<Text style={[styles.email, { color: textColor }]}>
					{user?.user?.email}
				</Text>
			</View>

			<ScrollView
				contentContainerStyle={styles.menuContainer}
				showsVerticalScrollIndicator={false}
			>
				{menuItems.map((item) => (
					<TouchableOpacity
						key={item.label}
						style={styles.customItem}
						onPress={() => router.push(item.path as any)}
					>
						<Ionicons
							name={item.icon as any}
							size={22}
							color={textColor}
						/>
						<Text style={[styles.itemText, { color: textColor }]}>
							{" "}
							{item.label}
						</Text>
					</TouchableOpacity>
				))}
				<View style={[styles.footer, { borderTopColor: textColor }]}>
					<TouchableOpacity
						style={styles.logoutButton}
						onPress={() => {
							logout();
							router.push("/");
						}}
					>
						<Ionicons
							name="log-out-outline"
							size={22}
							color="#FF6347"
						/>
						<Text style={[styles.itemText, { color: "#FF6347" }]}>
							Logout
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingVertical: 24,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		alignItems: "center",
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: 8,
	},
	username: {
		fontSize: 18,
		fontWeight: "600",
	},
	email: {
		fontSize: 14,
		opacity: 0.6,
	},
	menuContainer: {
		padding: 10,
	},
	customItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		marginLeft: 10,
		gap: 12,
	},
	itemText: {
		fontSize: 16,
	},
	footer: {
		borderTopWidth: 1,
		padding: 16,
		marginTop: 10,
	},
	logoutButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
});

export default function RootDrawerLayout() {
	const { secondaryColor } = useAppTheme();

	return (
		<Drawer
			screenOptions={{
				headerShown: false,
				drawerPosition: "left", // Optional: if you want right-side drawer
				drawerStyle: {
					width: "80%", // Control drawer width
					backgroundColor: secondaryColor,
				},
				overlayColor: "rgba(0,0,0,0.5)", // Semi-transparent overlay
			}}
			drawerContent={(props) => <CustomDrawer {...props} />}
		></Drawer>
	);
}

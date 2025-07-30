import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";

const CustomDrawer = (props: any) => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					source={{
						uri: "https://ix-marketing.imgix.net/focalpoint.png?auto=format,compress&w=1946",
					}}
					style={styles.profileImage}
				/>
				<Text style={styles.username}>John Doe</Text>
				<Text style={styles.email}>john@example.com</Text>
			</View>

			{/* Custom Items */}
			<TouchableOpacity style={styles.customItem}>
				<Ionicons name="settings-outline" size={22} color={"white"} />
				<Text style={styles.itemText}>Settings</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.customItem}
				onPress={() => {
					router.push("/(protected)/profile");
				}}
			>
				<Ionicons name="person" size={22} color={"white"} />
				<Text style={styles.itemText}>Profile</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.customItem}
				onPress={() => {
					router.push("/(protected)/complaints");
				}}
			>
				<Ionicons name="person" size={22} color={"white"} />
				<Text style={styles.itemText}>Complaint</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.customItem}
				onPress={() => router.push("/(protected)/profile")}
			>
				<Ionicons
					name="person-remove-outline"
					size={22}
					color={"white"}
				/>
				<Text style={styles.itemText}>Edit Profile</Text>
			</TouchableOpacity>

			{/* Footer Section */}
			<View style={styles.footer}>
				<TouchableOpacity
					style={styles.logoutButton}
					onPress={() => router.push("/")}
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
	},
	header: {
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#f4f4f4",
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: 10,
	},
	username: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
	email: {
		fontSize: 14,
		color: "#fff",
	},
	customItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		paddingLeft: 20,
	},
	itemText: {
		marginLeft: 15,
		fontSize: 16,
		color: "white",
	},
	footer: {
		padding: 20,
		borderTopWidth: 1,
		borderTopColor: "#f4f4f4",
	},
	logoutButton: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default function RootDrawerLayout() {
	return (
		<Drawer
			screenOptions={{
				headerShown: false,
				drawerPosition: "left", // Optional: if you want right-side drawer
				drawerStyle: {
					width: "80%", // Control drawer width
					backgroundColor: "#343232",
				},
				overlayColor: "rgba(0,0,0,0.5)", // Semi-transparent overlay
			}}
			drawerContent={(props) => <CustomDrawer {...props} />}
		></Drawer>
	);
}

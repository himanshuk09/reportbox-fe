// app/(tabs)/ComplaintCategoriesScreen.tsx

import React from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	FlatList,
} from "react-native";
import { StyleSheet } from "react-native";
import {
	MaterialCommunityIcons,
	FontAwesome5,
	Ionicons,
	Entypo,
	Feather,
	FontAwesome,
	FontAwesome6,
	MaterialIcons,
} from "@expo/vector-icons";

const categories = [
	{
		label: "Sewage Leak",
		icon: (
			<MaterialCommunityIcons
				name="pipe-leak"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Garbage Clean",
		icon: <FontAwesome5 name="trash" size={28} color="#00F0FF" />,
	},
	{
		label: "Garbage van",
		icon: <MaterialCommunityIcons name="truck" size={28} color="#00F0FF" />,
	},
	{
		label: "Storm Water Drains",
		icon: <Feather name="cloud-rain" size={28} color="#00F0FF" />,
	},
	{
		label: "Pothole",
		icon: <Ionicons name="warning-outline" size={28} color="#00F0FF" />,
	},
	{
		label: "Mosquito Menace",
		icon: <FontAwesome6 name="mosquito" size={28} color="#00F0FF" />,
	},
	{
		label: "Public Toilet",
		icon: <Ionicons name="people-outline" size={28} color="#00F0FF" />,
	},
	{
		label: "Street Dogs",
		icon: (
			<MaterialCommunityIcons name="dog-side" size={28} color="#00F0FF" />
		),
	},
	{
		label: "Water Stagnation",
		icon: <FontAwesome5 name="water" size={28} color="#00F0FF" />,
	},
	{
		label: "Street light",
		icon: (
			<MaterialCommunityIcons
				name="light-flood-up"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Tree Fallen",
		// icon: <MaterialCommunityIcons name="tree" size={28} color="#00F0FF" />,
		icon: <Entypo name="tree" size={28} color="#00F0FF" />,
	},
	{
		label: "Others",
		icon: <Entypo name="dots-three-horizontal" size={28} color="#00F0FF" />,
	},
	// New
	{
		label: "Lighting Dept",
		icon: <Feather name="zap" size={28} color="#00F0FF" />,
	},
	{
		label: "Health Dept",
		icon: (
			<MaterialCommunityIcons
				name="hospital-box-outline"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Sewerage & Drainage",
		icon: (
			<MaterialCommunityIcons
				name="water-pump"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Stray Animals",
		icon: <MaterialCommunityIcons name="cow" size={28} color="#00F0FF" />,
	},
	{
		label: "Horticulture",
		icon: (
			<MaterialCommunityIcons name="flower" size={28} color="#00F0FF" />
		),
	},
	{
		label: "Water Dept",
		icon: <FontAwesome5 name="tint" size={28} color="#00F0FF" />,
	},
	{
		label: "Consumer Complaints",
		icon: <FontAwesome name="rupee" size={28} color="#00F0FF" />,
	},
	{
		label: "Paan, Gutkha, Spitting",
		icon: <MaterialIcons name="smoking-rooms" size={28} color="#00F0FF" />,
	},
	{
		label: "PM Awas Yojana",
		icon: <FontAwesome5 name="home" size={28} color="#00F0FF" />,
	},
	{
		label: "Paid Sanitization",
		icon: (
			<MaterialCommunityIcons
				name="spray-bottle"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Public Works Dept",
		icon: (
			<MaterialCommunityIcons
				name="hammer-screwdriver"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "C&D Waste",
		icon: (
			<MaterialCommunityIcons
				name="dump-truck"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Green Waste",
		icon: <MaterialCommunityIcons name="leaf" size={28} color="#00F0FF" />,
	},
	{
		label: "Food Safety",
		icon: (
			<MaterialCommunityIcons
				name="food-fork-drink"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "IBUS Transport",
		icon: (
			<MaterialCommunityIcons name="bus-side" size={28} color="#00F0FF" />
		),
	},
	{
		label: "Noise Pollution",
		icon: (
			<MaterialCommunityIcons
				name="volume-high"
				size={28}
				color="#00F0FF"
			/>
		),
	},

	// Requests
	{
		label: "Garbage Cart Request",
		icon: <MaterialCommunityIcons name="cart" size={28} color="#00F0FF" />,
	},
	{
		label: "Home Composting Kit",
		icon: (
			<MaterialCommunityIcons name="compass-rose" size={28} color="#00F0FF" />
		),
	},
	{
		label: "Utensil Bank Request",
		icon: (
			<MaterialCommunityIcons
				name="silverware-fork-knife"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Water Harvesting Request",
		icon: (
			<MaterialCommunityIcons
				name="water-outline"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Safaimitra Helpline",
		icon: <Ionicons name="call-outline" size={28} color="#00F0FF" />,
	},
	{
		label: "Yellow Spot",
		icon: <MaterialIcons name="report" size={28} color="#00F0FF" />,
	},
	{
		label: "Sanitation Report",
		icon: (
			<Ionicons name="document-text-outline" size={28} color="#00F0FF" />
		),
	},
	{
		label: "Know Your Kachra",
		icon: (
			<MaterialCommunityIcons
				name="recycle-variant"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Reuse Treated Water",
		icon: (
			<MaterialCommunityIcons
				name="water-sync"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "C&D Collection Point",
		icon: (
			<MaterialCommunityIcons
				name="map-marker"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Rain Water Contractors",
		icon: (
			<MaterialCommunityIcons
				name="account-group"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Rain Harvesting Cost",
		icon: <FontAwesome name="money" size={28} color="#00F0FF" />,
	},
	{
		label: "Plastic Ban Helpline",
		icon: (
			<MaterialCommunityIcons
				name="smoking-off"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "PNG Gas Request",
		icon: (
			<MaterialCommunityIcons
				name="gas-cylinder"
				size={28}
				color="#00F0FF"
			/>
		),
	},
];

const ComplaintCategoriesScreen = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={categories}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.item}>
						<View style={styles.iconCircle}>{item.icon}</View>
						<Text style={styles.label}>{item.label}</Text>
					</TouchableOpacity>
				)}
				showsVerticalScrollIndicator={false}
				numColumns={3}
				contentContainerStyle={styles.listContent}
			/>
		</View>
	);
};

export default ComplaintCategoriesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#343232",
		paddingHorizontal: 6,
		paddingVertical: 6,
		paddingTop: 120, 
	},
	listContent: {
		paddingBottom: 100,
		paddingHorizontal: 10,
		gap: 20,
	},
	item: {
		flex: 1 / 3,
		alignItems: "center",
		marginBottom: 25,
	},
	iconCircle: {
		backgroundColor: "#1c1c1c",
		borderRadius: 50,
		padding: 20,
		marginBottom: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		color: "#fff",
		fontSize: 12,
		textAlign: "center",
	},
});
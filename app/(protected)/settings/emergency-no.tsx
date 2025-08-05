import Blob from "@/components/on-bording/blob";
import { useAppTheme } from "@/hooks/useAppTheme";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import React from "react";
import {
	Linking,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const emergencyContacts = [
	{
		label: "Mayor Helpline",
		icon: <MaterialIcons name="record-voice-over" size={20} />,
		phone: "1800123456",
	},
	{
		label: "Nagar Nigam",
		icon: <FontAwesome name="building" size={20} />,
		phone: "1800654321",
	},
	{
		label: "Fire Department",
		icon: <MaterialIcons name="local-fire-department" size={20} />,
		phone: "101",
	},
	{
		label: "Police Control Room",
		icon: <FontAwesome name="shield" size={20} />,
		phone: "100",
	},
	{
		label: "Ambulance",
		icon: <FontAwesome name="ambulance" size={20} />,
		phone: "102",
	},
	{
		label: "Electricity Emergency",
		icon: <MaterialIcons name="bolt" size={20} />,
		phone: "1912",
	},
];

const EmergencyContactScreen = () => {
	const { cardsColor, primaryColor, textColor, secondaryColor } =
		useAppTheme();

	const handleCall = (number: string) => {
		Linking.openURL(`tel:${number}`);
	};

	const renderItem = ({ item }: { item: (typeof emergencyContacts)[0] }) => (
		<TouchableOpacity
			style={[styles.itemContainer, { backgroundColor: cardsColor }]}
			onPress={() => handleCall(item.phone)}
			activeOpacity={0.8}
		>
			<View style={[styles.iconBox, { borderColor: primaryColor }]}>
				{React.cloneElement(item.icon, { color: primaryColor })}
			</View>
			<Text style={[styles.label, { color: textColor }]}>
				{item.label}
			</Text>
			<FontAwesome name="phone" size={20} color={primaryColor} />
		</TouchableOpacity>
	);

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: secondaryColor }]}
		>
			<LegendList
				data={emergencyContacts}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.list}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				estimatedItemSize={25}
				recycleItems
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
		</SafeAreaView>
	);
};

export default EmergencyContactScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
	},
	list: {
		paddingBottom: 40,
	},
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	iconBox: {
		width: 35,
		height: 35,
		borderRadius: 20,
		borderWidth: 1.5,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 16,
	},
	label: {
		flex: 1,
		fontSize: 16,
		fontWeight: "500",
	},
});

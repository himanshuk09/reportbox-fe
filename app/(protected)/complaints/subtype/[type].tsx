import Blob from "@/components/on-bording/blob";
import {
	Animal_Control,
	Health_Safety,
	Housing_Welfare,
	Sanitation_Categories,
	Street_Infrastructure,
	Water_Sewage,
} from "@/constants/complaints";
import { useAppTheme } from "@/hooks/useAppTheme";
import { LegendList } from "@legendapp/list";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RenderComplaintList = () => {
	const { cardsColor, primaryColor, textColor, secondaryColor } =
		useAppTheme();
	const { type } = useLocalSearchParams();
	const getComplaintData = () => {
		switch (type) {
			case "sanitation":
				return Sanitation_Categories;
			case "water":
				return Water_Sewage;
			case "health":
				return Health_Safety;
			case "street":
				return Street_Infrastructure;
			case "animal":
				return Animal_Control;
			case "housing":
				return Housing_Welfare;
			default:
				return [];
		}
	};

	const complaintData = getComplaintData();
	const renderItem = ({ item }: { item: any }) => (
		<TouchableOpacity
			style={[styles.itemContainer, { backgroundColor: cardsColor }]}
			activeOpacity={0.8}
		>
			<View style={[styles.iconBox, { borderColor: primaryColor }]}>
				{React.cloneElement(item.icon, { color: primaryColor })}
			</View>
			<Text style={[styles.label, { color: textColor }]}>
				{item.label}
			</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: secondaryColor }]}
		>
			<LegendList
				estimatedItemSize={25}
				recycleItems
				data={complaintData}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderItem}
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={false}
				extraData={[cardsColor, textColor, primaryColor]}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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

export default RenderComplaintList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		marginTop: 80,
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

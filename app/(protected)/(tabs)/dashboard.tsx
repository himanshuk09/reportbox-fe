import { bannersImageUrls } from "@/constants/banners";
import { categories } from "@/constants/complaints";
import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const ComplaintCategoriesScreen = () => {
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: secondaryColor }]}
		>
			<FlatList
				data={categories}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.item}>
						<View
							style={[
								styles.iconCircle,
								{
									backgroundColor: cardsColor,
									borderColor: primaryColor,
									borderWidth: 1,
								},
							]}
						>
							{item.icon}
						</View>
						<Text
							style={[
								styles.label,
								{
									color: textColor,
									fontWeight: "500",
								},
							]}
						>
							{item.label}
						</Text>
					</TouchableOpacity>
				)}
				ListHeaderComponent={
					<View style={{ height: 200, marginBottom: 20 }}>
						<Swiper
							showsPagination
							autoplay
							autoplayTimeout={3}
							dotColor="#ccc"
							activeDotColor={primaryColor}
							style={{ borderRadius: 15 }}
						>
							{bannersImageUrls.map((uri, index) => (
								<Image
									key={index}
									source={{ uri }}
									style={{
										width: "100%",
										height: 200,
										borderRadius: 15,
									}}
									resizeMode="cover"
								/>
							))}
						</Swiper>
					</View>
				}
				showsVerticalScrollIndicator={false}
				numColumns={3}
				contentContainerStyle={styles.listContent}
			/>
		</SafeAreaView>
	);
};

export default ComplaintCategoriesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 6,
		paddingHorizontal: 6,
		marginTop: 90,
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
		borderRadius: 50,
		padding: 20,
		marginBottom: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		fontSize: 12,
		textAlign: "center",
	},
});

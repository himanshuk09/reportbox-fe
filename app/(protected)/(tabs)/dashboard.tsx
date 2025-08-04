import { getLocationDetails } from "@/components/native/Map";
import { bannersImageUrls } from "@/constants/banners";
import { Dashboard_Categories } from "@/constants/complaints";
import { useAppTheme } from "@/hooks/useAppTheme";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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

const getWeatherEmoji = (code: number) => {
	if (code === 0) return "☀️";
	if (code === 1) return "🌤";
	if (code === 2) return "⛅";
	if (code === 3) return "☁️";
	if (code >= 45 && code <= 48) return "🌫";
	if (code >= 51 && code <= 67) return "🌧";
	if (code >= 71 && code <= 77) return "🌨";
	if (code >= 95) return "⛈";
	return "🌍";
};

async function getWeather({ latitude, longitude }: any) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

const ComplaintCategoriesScreen = () => {
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();
	const [weather, setWeather] = useState<any>(null);

	useEffect(() => {
		const fetchLocation = async () => {
			const { geo, loc }: any = await getLocationDetails();
			const data = await getWeather({
				latitude: loc?.coords?.latitude,
				longitude: loc?.coords?.longitude,
			});
			setWeather(data?.current_weather);
		};
		fetchLocation();
	}, []);

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: secondaryColor }]}
		>
			<FlatList
				data={Dashboard_Categories}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }: any) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() => {
							if (item.route) {
								router.push(item?.route);
							}
						}}
					>
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
							{React.cloneElement(item.icon, {
								color: primaryColor,
							})}
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
					<View style={{ marginBottom: 20 }}>
						{/* Swiper */}
						<View style={{ height: 200, marginBottom: 10 }}>
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

						{/* Weather Bar */}
						{weather && (
							<View
								style={
									{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										backgroundColor: cardsColor,
										padding: 10,
										borderRadius: 10,
										marginHorizontal: 5,
										marginBottom: 10,
									} as any
								}
							>
								<Text
									style={{
										fontSize: 14,
										fontWeight: "600",
										color: primaryColor,
										marginRight: 6,
									}}
								>
									Live Weather
								</Text>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text style={{ fontSize: 18 }}>
										{getWeatherEmoji(weather.weathercode)}
									</Text>
									<Text
										style={{
											fontSize: 14,
											color: primaryColor,
											marginLeft: 6,
											fontWeight: "600",
										}}
									>
										{weather.temperature}°C
									</Text>
								</View>
							</View>
						)}
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
		marginTop: 80,
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

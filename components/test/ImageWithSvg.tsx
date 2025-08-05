import { useAppTheme } from "@/hooks/useAppTheme";
import { router } from "expo-router";
import React from "react";
import {
	Dimensions,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
import Svg, { G, Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const height1 = 160;

function DoubleWaveSvg() {
	const { primaryColor, secondaryColor } = useAppTheme();

	return (
		<Svg width={width} height={height1}>
			{/* Cyan top border path */}
			<Path
				d={`
          M0,80
          Q${width * 0.25},130 ${width * 0.5},100
          T${width},80
        `}
				stroke={primaryColor}
				strokeWidth={30}
				fill="transparent"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>

			{/* Dark filled wave */}
			<Path
				d={`
                M0,80
                Q${width * 0.25},130 ${width * 0.5},100
                T${width},80
                L${width},${height1}
                L0,${height1}
                Z
                `}
				fill={secondaryColor}
				fillOpacity={1}
			/>
		</Svg>
	);
}

const { width: screenWidth } = Dimensions.get("window");
const aspectRatio = 277 / 390;
const svgWidth = screenWidth;
const svgHeight = screenWidth * aspectRatio;

const MobileSvg = () => {
	const { width } = useWindowDimensions();
	const { primaryColor, secondaryColor } = useAppTheme();

	return (
		<Svg
			width={width}
			height={svgHeight}
			viewBox="0 0 390 100"
			style={{ width: "100%", height: svgHeight }}
		>
			<G transform="scale(-1,1) translate(-390,0)">
				<Path
					d="m-3 100c28.5-23.5 80-53.4 134-45 67.5 10.5 106 77.5 200.5 58 55.3-11.41 74.91-37.43 79.5-58.22v-19.78c1.34 5.23 1.68 12.16 0 19.78v108.1h-416.68z"
					fill={primaryColor}
				/>
				<Path
					d="m-.5 130c14-11.98 52.98-37.52 106.96-28.64 67.48 11.1 130.46 59.18 224.93 38.58 55.29-12.06 74.89-39.56 79.48-61.53v-20.91c1.34 5.53 1.68 12.85 0 20.91v130.09h-433.87z"
					fill={secondaryColor}
				/>
			</G>
		</Svg>
	);
};

export default function WaveHeaderScreen() {
	const { primaryColor, secondaryColor } = useAppTheme();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					contentContainerStyle={{
						marginBottom: 20,
					}}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					{/* Header with Image and wave */}
					<View style={styles.headerWrapper}>
						<ImageBackground
							source={{
								uri: "https://images.pexels.com/photos/1154059/pexels-photo-1154059.jpeg",
							}}
							style={styles.image}
							resizeMode="cover"
						>
							<MobileSvg />
						</ImageBackground>
					</View>

					{/* Below wave area */}
					<View
						style={[
							styles.bottomContent,
							{ backgroundColor: secondaryColor },
						]}
					>
						<Text style={styles.title}>Sign in</Text>
						<TextInput
							style={styles.input}
							placeholder="Phone number"
							placeholderTextColor="#ccc"
						/>
						<TouchableOpacity
							style={[
								styles.button,
								{ backgroundColor: primaryColor },
							]}
							onPress={() =>
								router.push("/(protected)/(tabs)/dashboard")
							}
						>
							<Text style={styles.buttonText}>Get OTP</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	headerWrapper: {
		position: "relative",
		height: height * 0.5,
	},
	image: {
		flex: 1,
		justifyContent: "flex-end",
	},
	headerContent: {
		position: "absolute",
		top: 100,
		width: "100%",
		alignItems: "center",
	},
	headerText: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
	},
	bottomContent: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 22,
		color: "#fff",
		fontWeight: "bold",
		marginBottom: 16,
	},
	input: {
		borderBottomColor: "#555",
		borderBottomWidth: 1,
		color: "#fff",
		marginBottom: 20,
		paddingVertical: 8,
	},
	button: {
		paddingVertical: 12,
		alignItems: "center",
		borderRadius: 8,
	},
	buttonText: {
		color: "#000",
		fontWeight: "bold",
	},
});

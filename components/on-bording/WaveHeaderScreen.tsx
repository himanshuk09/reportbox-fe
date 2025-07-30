import React from "react";
import {
	SafeAreaView,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
	ImageBackground,
	StyleSheet,
	Dimensions,
} from "react-native";
import MobileSvg from "./MobileSvg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface WaveHeaderScreenProps {
	headerImageUri: string;
	children: React.ReactNode;
	imageContainerHeight?: any;
	svgStyle?: object;
	bottomContentStyle?: object;
	imageOverlayContent?: React.ReactNode;
	floatingOverlay?: React.ReactNode;
}

export default function WaveHeaderScreen({
	headerImageUri,
	children,
	imageContainerHeight = 0.6,
	svgStyle,
	bottomContentStyle,
	imageOverlayContent,
	floatingOverlay,
}: WaveHeaderScreenProps) {
	const defaultImageHeight = screenHeight * imageContainerHeight;
	return (
		<SafeAreaView style={styles.safeArea}>
			{floatingOverlay && (
				<View
					style={{
						position: "absolute",
						top: screenHeight / 2 - 120,
						left: screenWidth / 2 - 130,
						zIndex: 20,
					}}
				>
					{floatingOverlay}
				</View>
			)}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					contentContainerStyle={styles.scrollViewContent}
					keyboardShouldPersistTaps="handled"
				>
					<View
						style={[
							styles.headerWrapper,
							{
								height: defaultImageHeight,
							},
						]}
					>
						<ImageBackground
							source={{ uri: headerImageUri }}
							style={styles.imageBackground}
							resizeMode="cover"
						>
							{imageOverlayContent || (
								<MobileSvg style={svgStyle} />
							)}
						</ImageBackground>
					</View>

					<View style={[styles.bottomContent, bottomContentStyle]}>
						{children}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#343232",
	},
	scrollViewContent: {
		flexGrow: 1,
		// marginBottom: 65,
	},
	headerWrapper: {
		width: "100%",
		position: "relative",
	},
	imageBackground: {
		width: "100%",
		height: "100%",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	bottomContent: {
		flex: 1,
		position: "relative",
		backgroundColor: "#343232",
		paddingHorizontal: 20,
	},

	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "white",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		width: "100%",
		height: 50,
		backgroundColor: "#2e2e2e",
		borderRadius: 10,
		paddingHorizontal: 15,
		color: "white",
		marginBottom: 15,
	},
	button: {
		width: "100%",
		height: 50,
		backgroundColor: "#007AFF", // Example button color
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});

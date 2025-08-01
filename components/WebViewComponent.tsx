import { View, Text, StyleSheet } from "react-native";
import React from "react";
import WebView from "react-native-webview";

const WebViewComponent = ({
	webviewRef,
	htmlcontent = "",
	onMessage = () => {},
	setLoaded = () => {},
}: any) => {
	return (
		<WebView
			ref={webviewRef}
			originWhitelist={["*"]}
			source={{ html: htmlcontent }}
			onMessage={onMessage}
			onLoadStart={() => {}}
			onLoad={() => {}}
			onLoadEnd={() => setLoaded(true)}
			onFileDownload={({ nativeEvent }: any) => {
				const { downloadUrl } = nativeEvent;
			}}
			style={styles.webview}
			onHttpError={(syntheticEvent) => {
				const { statusCode } = syntheticEvent.nativeEvent;
				console.log("HTTP error status code", statusCode);
			}}
			containerStyle={{
				overflow: "hidden",
				width: "100%",
				height: "90%",
				marginVertical: 0,
				padding: 2,
				borderRadius: 10,
			}}
			overScrollMode="content"
			gestureHandling="auto"
			scrollEnabled={false}
			javaScriptEnabled={true}
			domStorageEnabled={true}
			allowFileAccess={true}
			useWebkit={true}
			allowsFullscreenVideo={true}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			setWebContentsDebuggingEnabled={true}
			scalesPageToFit={true}
			setBuiltInZoomControls={false}
			allowsInlineMediaPlayback={true}
			bounces={false}
			zoomEnabled={false}
			nestedScrollEnabled={true}
			renderToHardwareTextureAndroid
			startInLoadingState
			automaticallyAdjustContentInsets={false}
		/>
	);
};

export default WebViewComponent;
const styles = StyleSheet.create({
	webview: {
		flex: 1,
		width: "100%",
		height: "98%",
		backgroundColor: "transparent",
	},
});

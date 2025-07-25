import { Link } from "expo-router";
import React from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";

const Feed = () => {
	return (
		<View style={{ flex: 1, backgroundColor: "#343232" }}>
			<ScrollView>
				<Link href="/(protected)/profile" push asChild>
					<Button title="Profile" />
				</Link>
				{[...Array(30)].map((_, i) => (
					<View
						key={i}
						style={{
							flexDirection: "row",
							alignItems: "center",
							padding: 24,
						}}
					>
						<Image
							source={{
								uri: "https://plus.unsplash.com/premium_photo-1683140840845-073fa9638261?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							}}
							style={{ width: 32, height: 32, marginRight: 16 }}
						/>
						<Text style={{ fontSize: 18, color: "white" }}>
							Dummy Item {i + 1}
						</Text>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default Feed;

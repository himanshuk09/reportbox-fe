import Blob from "@/components/on-bording/blob";
import React from "react";
import { View } from "react-native";

const Notifications = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#343232",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Blob text={"No Notification"} iconName="notifications" />
		</View>
	);
};

export default Notifications;

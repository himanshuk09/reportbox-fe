import Blob from "@/components/on-bording/blob";
import React from "react";
import { View } from "react-native";

const MyComplaint = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#343232",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Blob text={"No Complaint"} iconName="alert-circle-sharp" />
		</View>
	);
};

export default MyComplaint;

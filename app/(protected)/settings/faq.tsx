import { useLoading } from "@/contexts/LoadingContext";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const FAQ = () => {
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
	return (
		<View>
			<Text>FAQ</Text>
		</View>
	);
};

export default FAQ;

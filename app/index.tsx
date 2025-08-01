import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

const Initial = () => {
	const { session, isLoading } = useAuth();
	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-[#343232]">
				<ActivityIndicator size="large" color="#00EEFF" />
			</View>
		);
	}
	return session ? (
		<Redirect href={"/(protected)/(tabs)/dashboard"} />
	) : (
		<Redirect href={"/(public)/welcome"} />
	);
};

export default Initial;

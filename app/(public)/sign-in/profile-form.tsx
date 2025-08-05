import UserForm from "@/components/profile/UserForm";
import { useRouter } from "expo-router";
import React from "react";
export default function ProfileFormScreen() {
	const router = useRouter();
	return (
		<UserForm
			onlyForm={true}
			editable={false}
			onPressContinue={() =>
				router.replace("/(protected)/(tabs)/dashboard")
			}
		/>
	);
}

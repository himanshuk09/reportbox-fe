
import React from "react";
import UserForm from "@/components/profile/UserForm";
import { router } from "expo-router";
export default function ProfileFormScreen() {	
	return (
		<UserForm onlyForm={true} editable={false} onPressContinue={()=>router.replace("/(protected)/(tabs)/dashboard") } />
	);
}



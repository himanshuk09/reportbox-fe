import CustomSwitch from "@/components/CustomSwitch";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SettingsPanel = () => {
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);
	const [language, setLanguage] = useState("en");

	return (
		<View
			style={{
				flex: 1,
				padding: 16,
				backgroundColor: "#343232",
				marginTop: 100,
				paddingTop: 40,
			}}
		>
			{/* Dark Mode */}
			<View className="flex-row items-center justify-between mb-8">
				<View className="flex-row items-center gap-3">
					<Ionicons name="moon" size={25} color="white" />
					<Text className="text-white text-lg">Dark Mode</Text>
				</View>

				<CustomSwitch
					isEnabled={isDarkMode}
					setIsEnabled={setIsDarkMode}
				/>
			</View>

			{/* Notifications */}
			<View className="flex-row items-center justify-between mb-8">
				<View className="flex-row items-center gap-3">
					<Feather name="bell" size={25} color="white" />
					<Text className="text-white text-lg">Notifications</Text>
				</View>

				<CustomSwitch
					isEnabled={notificationsEnabled}
					setIsEnabled={setNotificationsEnabled}
				/>
			</View>

			{/* Language */}
			<View className="flex-row items-center justify-between mb-12">
				<View className="flex-row items-center gap-3">
					<Feather name="globe" size={25} color="white" />
					<Text className="text-white text-lg">Language</Text>
				</View>
				<View className="flex-row gap-2">
					<TouchableOpacity
						className={`border rounded px-2 py-1 ${
							language === "ta" ? "bg-white" : "border-white"
						}`}
						onPress={() => setLanguage("ta")}
					>
						<Text
							className={`text-md ${language === "ta" ? "text-black" : "text-white"}`}
						>
							தமிழ்
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className={`border rounded px-2 py-1 ${
							language === "en"
								? "bg-[#00EEFF] border-transparent"
								: "border-white"
						}`}
						onPress={() => setLanguage("en")}
					>
						<Text
							className={`text-md ${language === "en" ? "text-white" : "text-white"}`}
						>
							English
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Logout */}
			<TouchableOpacity className="bg-[#00BBD6] py-3 rounded-full">
				<Text className="text-center text-[#1e1e1e] font-semibold">
					Log Out
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SettingsPanel;

import CustomSwitch from "@/components/CustomSwitch";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SettingsPanel = () => {
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);
	const [language, setLanguage] = useState("en");
	const { theme, mode, setThemeMode } = useThemeContext();
	const { primaryColor, secondaryColor, textColor } = useAppTheme();
	return (
		<View
			style={{
				flex: 1,
				padding: 16,
				backgroundColor: secondaryColor,
				marginTop: 100,
				paddingTop: 40,
			}}
		>
			<View className="mb-8 flex-row items-center justify-between">
				<View className="flex-row items-center gap-3">
					<Ionicons name="moon" size={25} color={textColor} />
					<Text
						className=" text-lg"
						style={{
							color: textColor,
						}}
					>
						Theme
					</Text>
				</View>
				<View className="flex-row gap-2">
					{["light", "dark", "system"].map((option: any) => (
						<TouchableOpacity
							key={option}
							className={`border rounded px-3 py-1 ${
								mode === option
									? "bg-[#00eeff]"
									: "border-gray-400"
							}`}
							onPress={() => setThemeMode(option)}
						>
							<Text
								className={`capitalize ${
									mode === option
										? "font-semibold"
										: "text-[#ccc]"
								}`}
							>
								{option}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
			{/* Notifications */}
			<View className="flex-row items-center justify-between mb-8">
				<View className="flex-row items-center gap-3">
					<Feather name="bell" size={25} color={textColor} />
					<Text
						className=" text-lg"
						style={{
							color: textColor,
						}}
					>
						Notifications
					</Text>
				</View>

				<CustomSwitch
					isEnabled={notificationsEnabled}
					setIsEnabled={setNotificationsEnabled}
				/>
			</View>

			{/* Language */}
			<View className="flex-row items-center justify-between mb-12">
				<View className="flex-row items-center gap-3">
					<Feather name="globe" size={25} color={textColor} />
					<Text
						className=" text-lg"
						style={{
							color: textColor,
						}}
					>
						Language
					</Text>
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
				<Text
					className="text-center  font-semibold"
					style={{
						color: textColor,
					}}
				>
					Log Out
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SettingsPanel;

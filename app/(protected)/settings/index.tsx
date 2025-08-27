import CustomSwitch from "@/components/ui/CustomSwitch";
import RoundedButton from "@/components/ui/RoundedButton";
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SettingsPanel = () => {
	const { logout, user } = useAuth();

	const [notificationsEnabled, setNotificationsEnabled] = useState(true);
	const [language, setLanguage] = useState("en");
	const { theme, mode, setThemeMode } = useThemeContext();
	const { primaryColor, secondaryColor, textColor, cardsColor } =
		useAppTheme();

	const getContrastText = (bgColor: string) => {
		// Simple contrast check to pick white or black text
		const rgb = parseInt(bgColor.replace("#", ""), 16);
		const r = (rgb >> 16) & 0xff;
		const g = (rgb >> 8) & 0xff;
		const b = (rgb >> 0) & 0xff;
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return luminance > 0.5 ? "#000" : "#fff";
	};

	const buttonTextColor = getContrastText(primaryColor);
	const isFocused = useIsFocused();
	const { setGlobalLoading } = useLoading();
	useEffect(() => {
		setGlobalLoading(false);
	}, [isFocused]);
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
			{/* Theme */}
			<View className="mb-8 flex-row items-center justify-between">
				<View className="flex-row items-center gap-3">
					<Ionicons name="moon" size={25} color={textColor} />
					<Text className="text-lg" style={{ color: textColor }}>
						Theme
					</Text>
				</View>
				<View className="flex-row gap-2">
					{["light", "dark", "system"].map((option: any) => (
						<TouchableOpacity
							key={option}
							style={{
								borderWidth: 1,
								borderRadius: 6,
								paddingVertical: 4,
								paddingHorizontal: 12,
								backgroundColor:
									mode === option
										? primaryColor
										: secondaryColor,
								borderColor:
									mode === option ? primaryColor : textColor,
							}}
							onPress={() => setThemeMode(option)}
						>
							<Text
								style={{
									color:
										mode === option
											? cardsColor
											: textColor,
									fontWeight: mode === option ? "600" : "400",
									textTransform: "capitalize",
								}}
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
					<Text className="text-lg" style={{ color: textColor }}>
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
					<Text className="text-lg" style={{ color: textColor }}>
						Language
					</Text>
				</View>
				<View className="flex-row gap-2">
					{[
						{ code: "hi", label: "Hindi" },
						{ code: "en", label: "English" },
					].map((lang) => (
						<TouchableOpacity
							key={lang.code}
							style={{
								borderWidth: 1,
								borderRadius: 6,
								paddingVertical: 2,
								paddingHorizontal: 8,
								backgroundColor:
									language === lang.code
										? primaryColor
										: secondaryColor,
								borderColor:
									language === lang.code
										? primaryColor
										: textColor,
							}}
							onPress={() => setLanguage(lang.code)}
						>
							<Text
								style={{
									color:
										language === lang.code
											? cardsColor
											: textColor,
									fontWeight:
										language === lang.code ? "600" : "400",
								}}
							>
								{lang.label}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* Logout */}
			<RoundedButton
				title={"Log Out"}
				onPress={() => {
					logout();
				}}
			/>
		</View>
	);
};
export default SettingsPanel;

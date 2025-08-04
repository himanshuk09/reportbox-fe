import { users } from "@/constants/posts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
	name: string;
	state: string;
	city: string;
	doorNo: string;
	street: string;
	userID: string;
	phoneNo: number;
	pin: number;
	avatar: string;
	group: "user" | "admin";
};

type AuthContextType = {
	user: any;
	session: boolean;
	isLoading: boolean;
	loginWithPhone: (phoneNo: number) => void;
	verifyOtp: (otp: string) => Promise<boolean>;
	completeProfile: (data: User) => Promise<void>;
	logout: () => void;
	setSessionActive: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<any | null>(null);
	const [session, setSession] = useState(false);
	const [phoneNo, setPhoneNo] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const stored = await AsyncStorage.getItem("user");
				if (stored) {
					const parsed = JSON.parse(stored);
					setUser(parsed);
					setSession(true);
				}
				setIsLoading(false);
			} catch (error) {
				console.log("Loading error");
			} finally {
				await SplashScreen.hideAsync();
			}
		};
		load();
	}, []);

	const loginWithPhone = (phone: number) => {
		setPhoneNo(phone);
	};

	const verifyOtp = async (otp: string) => {
		// Fake OTP match logic
		if (otp === "1234" && phoneNo) {
			const existing = users?.find((u: any) => u.phoneNo === phoneNo);
			if (existing) {
				setUser(existing);
				await AsyncStorage.setItem("user", JSON.stringify(existing));
			}
			return true;
		}
		return false;
	};
	const setSessionActive = () => {
		setSession(true);
	};
	const completeProfile = async (data: User) => {
		setUser(data);
		setSession(true);
		await AsyncStorage.setItem("user", JSON.stringify(data));
	};

	const logout = async () => {
		setUser(null);
		setSession(false);
		await AsyncStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
				isLoading,
				loginWithPhone,
				verifyOtp,
				completeProfile,
				logout,
				setSessionActive,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
// ✅ Step 2: Create the useAuth hook
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

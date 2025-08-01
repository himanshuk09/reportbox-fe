// export { useColorScheme } from 'react-native';
// 2. Replace useColorScheme.ts with this
import { useThemeContext } from "@/contexts/ThemeContext";

export function useColorScheme() {
	const { theme } = useThemeContext();
	return theme;
}

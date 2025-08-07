import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const setMMKV = (key: string, value: any) => {
	storage.set(key, JSON.stringify(value));
};

export const getMMKV = (key: string) => {
	const value = storage.getString(key);
	if (!value) return null;
	try {
		return JSON.parse(value);
	} catch {
		return null;
	}
};

export const removeMMKV = (key: string) => {
	storage.delete(key);
};
export const hasMMKV = (key: string) => {
	return storage.contains(key);
};

import NetInfo from "@react-native-community/netinfo";
import axios from "axios";

const api = axios.create({
	baseURL: "http://192.168.19.110:8080/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// 🚫 Block requests when offline
api.interceptors.request.use(
	async (config) => {
		const state = await NetInfo.fetch();

		if (!state.isConnected) {
			console.warn("📴 Offline - blocking request:", config.url);
			return Promise.reject({
				message:
					"You are offline. Please check your internet connection.",
				isOffline: true,
			});
		}

		// ✅ Optionally add auth token
		// const token = await getToken(); // Optional
		// if (token) {
		// 	config.headers.Authorization = `Bearer ${token}`;
		// }

		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.isOffline) {
			// Skip logging since it's a known offline block
		} else if (error.response) {
			// console.error("❌ API error:", error.response.data);
		} else if (error.request) {
			console.error("❌ No response:", error.request);
		} else {
			console.error("❌ Axios error:", error.message);
		}

		return Promise.reject(error);
	}
);

export default api;

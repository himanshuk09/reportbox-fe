import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const api = axios.create({
	baseURL: 'http://192.168.19.110:8080/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

// 🚫 Block requests when offline
api.interceptors.request.use(
	async (config) => {
		const state = await NetInfo.fetch();

		if (!state.isConnected) {
			console.warn('📴 Offline - blocking request:', config.url);
			return Promise.reject({
				message: 'You are offline. Please check your internet connection.',
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
			console.error('❌ No response:', error.request);
		} else {
			console.error('❌ Axios error:', error.message);
		}

		return Promise.reject(error);
	}
);

export default api;

export const uploadImageToCloudinary = async (imageUri: string) => {
	try {
		if (!imageUri) {
			console.log('Image URI is missing.');
		}
		const fileInfo = await FileSystem.getInfoAsync(imageUri);
		if (!fileInfo.exists) {
			console.log('File does not exist at URI: ' + imageUri);
		}
		const fileName = imageUri.split('/').pop() || 'photo.jpg';
		const fileType = fileName.endsWith('.png')
			? 'image/png'
			: 'image/jpeg';

		const formData = new FormData();
		formData.append('image', {
			uri: imageUri,
			type: fileType,
			name: fileName,
		} as any);

		const res = await api.post(`/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return res.data;
	} catch (err: any) {
		console.log('Upload failed:', err.message);
		return false;
	}
};

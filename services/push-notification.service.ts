import api from "./axiosInstance";

export const sendOrUpdateToken = async (
	userId: string,
	token: string | undefined
) => {
	try {
		const response = await api.post("/token", { userId, token });
		return response.data;
	} catch (error) {
		console.log(
			"Enable to store notify token",
			JSON.stringify(error, null, 1)
		);
	}
};

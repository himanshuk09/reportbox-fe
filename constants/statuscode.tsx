export const getStatusStyle = (status: string) => {
    switch (status) {
        case "Raised":
            return {
                backgroundColor: "#f97316", // orange-500
                color: "#fff",
            };
        case "Assigned":
            return {
                backgroundColor: "#3b82f6", // blue-500
                color: "#fff",
            };
        case "In Progress":
            return {
                backgroundColor: "#facc15", // yellow-400
                color: "#000",
            };
        case "Resolved":
            return {
                backgroundColor: "#10b981", // green-500
                color: "#fff",
            };
        default:
            return {
                backgroundColor: "#6b7280", // gray
                color: "#fff",
            };
    }
};
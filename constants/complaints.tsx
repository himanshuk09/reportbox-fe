import {
	Entypo,
	Feather,
	FontAwesome,
	FontAwesome5,
	FontAwesome6,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";

export const Dashboard_Categories = [
	{
		label: "About",
		icon: <Ionicons name="information-circle" size={28} color="black" />,
		route: "/(protected)/settings/about",
	},
	{
		label: "Complaint",
		icon: (
			<MaterialCommunityIcons
				name="comment-alert-outline"
				size={28}
				color="#00F0FF"
			/>
		),
		route: "/(protected)/(tabs)/complaints/create",
	},
	{
		label: "Sanitation Module",
		icon: <FontAwesome6 name="broom-ball" size={24} color="#00F0FF" />,
		route: "/(protected)/(tabs)/complaints/type/sanitation",
	},
	{
		label: "Water & Sewerage",
		icon: <MaterialCommunityIcons name="pipe" size={28} color="#00F0FF" />,
		route: "/(protected)/(tabs)/complaints/type/water",
	},
	{
		label: "Health & Safety",
		icon: <FontAwesome5 name="first-aid" size={28} color="#00F0FF" />,
		route: "/(protected)/(tabs)/complaints/type/health",
	},
	{
		label: "Street & Infrastructure",
		icon: <MaterialIcons name="construction" size={28} color="#00F0FF" />,
		route: "/(protected)/(tabs)/complaints/type/street",
	},
	{
		label: "Animal Control",
		icon: <MaterialCommunityIcons name="paw" size={28} color="#00F0FF" />,
		route: "/(protected)/(tabs)/complaints/type/animal",
	},
	{
		label: "Green Waste",
		icon: <MaterialCommunityIcons name="leaf" size={28} color="#00F0FF" />,
		route: "/(protected)/(tabs)/complaints/type/green-waste",
	},
	{
		label: "Public Works Dept",
		icon: (
			<MaterialCommunityIcons
				name="hammer-screwdriver"
				size={28}
				color="#00F0FF"
			/>
		),
		route: "/(protected)/(tabs)/complaints/type/works",
	},
	{
		label: "C & D Waste",
		icon: (
			<MaterialCommunityIcons
				name="dump-truck"
				size={28}
				color="#00F0FF"
			/>
		),
		route: "/(protected)/(tabs)/complaints/type/c-d",
	},
	{
		label: "Food Safety",
		icon: (
			<MaterialCommunityIcons
				name="food-fork-drink"
				size={28}
				color="#00F0FF"
			/>
		),
		route: "/(protected)/(tabs)/complaints/type/food-safety",
	},
	{
		label: "IBUS Transport",
		icon: (
			<MaterialCommunityIcons name="bus-side" size={28} color="#00F0FF" />
		),
		route: "/(protected)/(tabs)/complaints/type/bus",
	},
	{
		label: "Noise Pollution",
		icon: (
			<MaterialCommunityIcons
				name="volume-high"
				size={28}
				color="#00F0FF"
			/>
		),
		route: "/(protected)/(tabs)/complaints/type/noise",
	},
	{
		label: "Emergency Contact",
		icon: (
			<MaterialIcons name="contact-emergency" size={24} color="black" />
		),
		route: "/(protected)/settings/emergency-no",
	},
	{
		label: "Environment & Recycling",
		icon: (
			<MaterialCommunityIcons name="recycle" size={28} color="#00F0FF" />
		),
		route: "/(protected)/(tabs)/complaints/type/env",
	},
];

export const Sanitation_Categories = [
	{
		label: "Garbage Clean",
		icon: <FontAwesome5 name="trash" size={20} color="#00F0FF" />,
	},
	{
		label: "Garbage van",
		icon: <MaterialCommunityIcons name="truck" size={22} color="#00F0FF" />,
	},
	{
		label: "Home Composting",
		icon: <MaterialIcons name="compost" size={22} color="#00F0FF" />,
	},
	{
		label: "Utensil Bank",
		icon: (
			<MaterialCommunityIcons
				name="silverware-fork-knife"
				size={22}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "RRR (Reduce, Reuse, Recycle)",
		icon: (
			<MaterialCommunityIcons name="recycle" size={22} color="#00F0FF" />
		),
	},
	{
		label: "RRR Collection Point",
		icon: <Entypo name="location" size={22} color="#00F0FF" />,
	},
	{
		label: "Yellow Spot",
		icon: (
			<MaterialCommunityIcons
				name="map-marker"
				size={22}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Red Spot",
		icon: (
			<MaterialCommunityIcons
				name="alert-circle"
				size={22}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Sanitation Activity",
		icon: <MaterialCommunityIcons name="broom" size={22} color="#00F0FF" />,
	},
	{
		label: "Plastic Ban Helpline",
		icon: (
			<MaterialCommunityIcons
				name="smoking-off"
				size={22}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Paid Sanitization",
		icon: (
			<MaterialCommunityIcons
				name="spray-bottle"
				size={22}
				color="#00F0FF"
			/>
		),
	},
	{
		label: 'Know Your "Waste"',
		icon: (
			<MaterialCommunityIcons
				name="trash-can"
				size={22}
				color="#00F0FF"
			/>
		),
	},
];
export const Water_Sewage = [
	{
		label: "Sewage Leak",
		icon: (
			<MaterialCommunityIcons
				name="pipe-leak"
				size={22}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Storm Water Drains",
		icon: <Feather name="cloud-rain" size={22} color="#00F0FF" />,
	},
	{
		label: "Water Stagnation",
		icon: <FontAwesome5 name="water" size={22} color="#00F0FF" />,
	},
	{
		label: "Water Dept",
		icon: <FontAwesome5 name="tint" size={22} color="#00F0FF" />,
	},
	{
		label: "Sewerage & Drainage",
		icon: (
			<MaterialCommunityIcons
				name="water-pump"
				size={22}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Request for Water Harvesting",
		icon: <FontAwesome5 name="cloud" size={20} color="#00F0FF" />,
	},
	{
		label: "Treated Water Reuse Request",
		icon: <FontAwesome5 name="recycle" size={22} color="#00F0FF" />,
	},
	{
		label: "Rainwater Harvesting Contractors List",
		icon: (
			<MaterialCommunityIcons
				name="weather-rainy"
				size={24}
				color="#00F0FF"
			/>
		),
	},
];
export const Health_Safety = [
	{
		label: "Mosquito Menace",
		icon: <FontAwesome6 name="mosquito" size={22} color="#00F0FF" />,
	},
	{
		label: "Public Toilet",
		icon: <Ionicons name="people-outline" size={28} color="#00F0FF" />,
	},
	{
		label: "Health Dept",
		icon: (
			<MaterialCommunityIcons
				name="hospital-box-outline"
				size={22}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Paan, Gutkha, Spitting",
		icon: <MaterialIcons name="smoking-rooms" size={28} color="#00F0FF" />,
	},
	{
		label: "14420 Helpline",
		icon: <MaterialIcons name="phone-in-talk" size={24} color="#00F0FF" />,
	},
	{
		label: "SafaiMitra Safety Helpline",
		icon: <MaterialIcons name="security" size={24} color="#00F0FF" />,
	},
];
export const Street_Infrastructure = [
	{
		label: "Pothole",
		icon: <Ionicons name="warning-outline" size={28} color="#00F0FF" />,
	},
	{
		label: "Street light",
		icon: (
			<MaterialCommunityIcons
				name="light-flood-up"
				size={28}
				color="#00F0FF"
			/>
		),
	},
	{
		label: "Tree Fallen",
		icon: <Entypo name="tree" size={28} color="#00F0FF" />,
	},

	{
		label: "Lighting Dept",
		icon: <Feather name="zap" size={28} color="#00F0FF" />,
	},
	{
		label: "C&D Waste Collection Point",
		icon: (
			<MaterialCommunityIcons
				name="dump-truck"
				size={24}
				color="#00F0FF"
			/>
		),
	},

	{
		label: "PNG Gas Pipeline Request",
		icon: <MaterialCommunityIcons name="pipe" size={24} color="#00F0FF" />,
	},
	{
		label: "Horticulture",
		icon: (
			<MaterialCommunityIcons name="flower" size={28} color="#00F0FF" />
		),
	},
];
export const Animal_Control = [
	{
		label: "Street Dogs",
		icon: (
			<MaterialCommunityIcons name="dog-side" size={28} color="#00F0FF" />
		),
	},

	{
		label: "Stray Animals",
		icon: <MaterialCommunityIcons name="cow" size={28} color="#00F0FF" />,
	},
];
export const Housing_Welfare = [
	{
		label: "PM Awas Yojana",
		icon: <FontAwesome5 name="home" size={22} color="#00F0FF" />,
	},
	{
		label: "Consumer Complaints",
		icon: <FontAwesome name="rupee" size={22} color="#00F0FF" />,
	},
];
export const complaintTypes = [
	{
		label: "Sanitation Module",
		icon: "broom-ball",
		iconType: "FontAwesome6",
		categories: [
			{ label: "Green Waste", icon: "leaf", iconType: "FontAwesome5" },
			{ label: "Garbage Clean", icon: "trash", iconType: "FontAwesome5" },
			{
				label: "Garbage van",
				icon: "truck",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Home Composting",
				icon: "recycle",
				iconType: "FontAwesome5",
			},
			{
				label: "Utensil Bank",
				icon: "utensils",
				iconType: "FontAwesome5",
			},
			{ label: "RRR", icon: "recycle", iconType: "FontAwesome5" },
			{
				label: "RRR Collection Point",
				icon: "warehouse",
				iconType: "FontAwesome5",
			},
			{
				label: "Yellow Spot",
				icon: "dot-circle-o",
				iconType: "FontAwesome",
			},
			{
				label: "Red Spot",
				icon: "exclamation-circle",
				iconType: "FontAwesome",
			},
			{
				label: "Swachhata Activity",
				icon: "broom",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Plastic Ban Helpline",
				icon: "ban",
				iconType: "FontAwesome",
			},
			{
				label: "Paid Sanitization",
				icon: "spray-bottle",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Know your Garbage",
				icon: "info-circle",
				iconType: "FontAwesome",
			},
		],
	},
	{
		label: "Water & Sewerage",
		icon: "pipe",
		iconType: "MaterialCommunityIcons",
		categories: [
			{
				label: "Sewage Leak",
				icon: "pipe-leak",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Storm Water Drains",
				icon: "cloud-rain",
				iconType: "Feather",
			},
			{
				label: "Water Stagnation",
				icon: "water",
				iconType: "FontAwesome5",
			},
			{ label: "Water Dept", icon: "tint", iconType: "FontAwesome5" },
			{
				label: "C&D Collection Point",
				icon: "dump-truck",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Request for Water Harvesting",
				icon: "water-check",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Treated Water Reuse",
				icon: "water-sync",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "PNG Gas Pipeline Installation",
				icon: "gas-cylinder",
				iconType: "MaterialCommunityIcons",
			},
		],
	},
	{
		label: "Health & Safety",
		icon: "first-aid",
		iconType: "FontAwesome5",
		categories: [
			{
				label: "Mosquito Menace",
				icon: "mosquito",
				iconType: "FontAwesome6",
			},
			{
				label: "Public Toilet",
				icon: "people-outline",
				iconType: "Ionicons",
			},
			{
				label: "Health Dept",
				icon: "hospital-box-outline",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Noise Pollution",
				icon: "volume-high",
				iconType: "Ionicons",
			},
			{
				label: "Food Safety",
				icon: "utensils",
				iconType: "FontAwesome5",
			},
			{
				label: "14420 Helpline",
				icon: "phone-in-talk",
				iconType: "MaterialIcons",
			},
			{
				label: "Safaimitra Helpline",
				icon: "account-heart",
				iconType: "MaterialCommunityIcons",
			},
		],
	},
	{
		label: "Street & Infrastructure",
		icon: "construction",
		iconType: "MaterialIcons",
		categories: [
			{ label: "Pothole", icon: "warning-outline", iconType: "Ionicons" },
			{
				label: "Street light",
				icon: "light-flood-up",
				iconType: "MaterialCommunityIcons",
			},
			{ label: "Tree Fallen", icon: "tree", iconType: "Entypo" },
			{ label: "Lighting Dept", icon: "zap", iconType: "Feather" },
			{
				label: "Public Works Dept",
				icon: "building",
				iconType: "FontAwesome",
			},
			{ label: "PM Awas Yojana", icon: "home", iconType: "FontAwesome5" },
			{ label: "ibus", icon: "bus", iconType: "FontAwesome" },
		],
	},
	{
		label: "Animal Control",
		icon: "paw",
		iconType: "MaterialCommunityIcons",
		categories: [
			{
				label: "Street Dogs",
				icon: "dog-side",
				iconType: "MaterialCommunityIcons",
			},
			{
				label: "Stray Animals",
				icon: "cow",
				iconType: "MaterialCommunityIcons",
			},
		],
	},
	{
		label: "Other Complaints",
		icon: "dots-three-horizontal",
		iconType: "Entypo",
		categories: [
			{
				label: "Consumer Complaints",
				icon: "rupee",
				iconType: "FontAwesome",
			},
			{
				label: "Paan, Gutkha, Spitting",
				icon: "smoking-rooms",
				iconType: "MaterialIcons",
			},
			{
				label: "Environment",
				icon: "earth-europe",
				iconType: "FontAwesome6",
			},
			{ label: "Recycling", icon: "recycle", iconType: "FontAwesome5" },
		],
	},
];

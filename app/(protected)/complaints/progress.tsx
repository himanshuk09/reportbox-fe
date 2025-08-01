import WebViewComponent from "@/components/WebViewComponent";
import { useAppTheme } from "@/hooks/useAppTheme";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            background: transparent;
            overflow: hidden;
          }
        </style>
      </head>
      <body>
        <div id="chart" style="width: 100%; height: 95%;"></div>
        <script>
          var options = {
            chart: {
              type: 'radialBar',
              height: 300,
              sparkline: { enabled: true },
              animations: { enabled: false }
            },
            series: [50],
            plotOptions: {
              radialBar: {
                hollow: { size: '50%' },
                track: { background: '#e6e6e6' },
                dataLabels: {
                  name: { show: false },
                  value: {
                    show: true,
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#ccc',
                    offsetY: 8,
                  }
                }
              }
            },
            colors: ['#00eeff'],
            labels: ['Progress']
          };

          var chart = new ApexCharts(document.querySelector("#chart"), options);
          chart.render();
        </script>
      </body>
    </html>
  `;
const MyComplaintsScreen = () => {
	const { primaryColor, secondaryColor, cardsColor, textColor } =
		useAppTheme();

	const [complaint, setComplaints] = useState([]);
	if (complaint.length != 0) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: secondaryColor,
					justifyContent: "center",
					alignItems: "center",
				}}
			></View>
		);
	}
	return (
		<ScrollView
			className="flex-1  px-4 py-6"
			style={{ marginTop: 110, backgroundColor: secondaryColor }}
		>
			{/* Header */}
			<View className="mb-4">
				<Text
					className=" text-xl font-semibold"
					style={{
						color: textColor,
					}}
				>
					My Complaints
				</Text>
				<Text
					className=" mt-1 font-medium"
					style={{
						color: primaryColor,
					}}
				>
					My Progress
				</Text>
			</View>

			{/* Chart and Status Row */}
			<View className="flex-row justify-between mb-4">
				{/* Donut Chart */}
				<View
					className=" rounded-xl  w-[48%] items-center justify-center"
					style={{
						backgroundColor: cardsColor,
					}}
				>
					<View style={{ width: 180, height: 160 }}>
						<WebViewComponent
							// webviewRef={webviewRef}
							htmlcontent={html}
							// onMessage={onMessage}
							// setLoaded={setLocationReady}
						/>
					</View>
					<Text
						className=" mt-2 text-center font-semibold text-sm"
						style={{
							color: textColor,
						}}
					>
						Complaint ID:
					</Text>
					<Text
						className=" text-center font-bold text-sm mb-4"
						style={{
							color: textColor,
						}}
					>
						#MDU45632
					</Text>
				</View>

				{/* Status Timeline */}
				<View
					className="rounded-xl p-4 w-[48%]"
					style={{
						backgroundColor: cardsColor,
					}}
				>
					<Text
						className="font-semibold mb-2"
						style={{
							color: primaryColor,
						}}
					>
						Status Timeline
					</Text>
					<Text
						className=" mb-1"
						style={{
							color: textColor,
						}}
					>
						✓ Submitted
					</Text>
					<Text
						className=" mb-1"
						style={{
							color: textColor,
						}}
					>
						✓ Assigned to Officer
					</Text>
					<Text
						className=" mb-1"
						style={{
							color: textColor,
						}}
					>
						✓ In Progress
					</Text>
					<Text
						style={{
							color: textColor,
						}}
					>
						Estimated Resolution: 2 days
					</Text>
				</View>
			</View>

			{/* Details Section */}
			<View
				className=" rounded-xl p-4"
				style={{
					backgroundColor: cardsColor,
				}}
			>
				<Text
					className=" font-semibold mb-2"
					style={{
						color: primaryColor,
					}}
				>
					Details
				</Text>
				<Text
					style={{
						color: textColor,
					}}
				>
					Type: Garbage Collection
				</Text>
				<Text
					style={{
						color: textColor,
					}}
				>
					Date: 28 May 2025
				</Text>
				<Text
					style={{
						color: textColor,
					}}
				>
					Location: Villapuram TNHB colony
				</Text>
				<Text
					style={{
						color: textColor,
					}}
				>
					Mode: App
				</Text>
			</View>
		</ScrollView>
	);
};

export default MyComplaintsScreen;

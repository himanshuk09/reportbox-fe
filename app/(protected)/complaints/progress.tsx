import WebViewComponent from "@/components/WebViewComponent";
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
                    color: '#000',
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
	const [complaint, setComplaints] = useState([]);
	if (complaint.length != 0) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "#343232",
					justifyContent: "center",
					alignItems: "center",
				}}
			></View>
		);
	}
	return (
		<ScrollView
			className="flex-1  px-4 py-6"
			style={{ marginTop: 110, backgroundColor: "#343232" }}
		>
			{/* Header */}
			<View className="mb-4">
				<Text className="text-white text-xl font-semibold">
					My Complaints
				</Text>
				<Text className="text-[#00eeff] mt-1 font-medium">
					My Progress
				</Text>
			</View>

			{/* Chart and Status Row */}
			<View className="flex-row justify-between mb-4">
				{/* Donut Chart */}
				<View className="bg-white rounded-xl  w-[48%] items-center justify-center">
					<View style={{ width: 180, height: 160 }}>
						<WebViewComponent
							// webviewRef={webviewRef}
							htmlcontent={html}
							// onMessage={onMessage}
							// setLoaded={setLocationReady}
						/>
					</View>
					<Text className="text-black mt-2 text-center font-semibold text-sm">
						Complaint ID:
					</Text>
					<Text className="text-black text-center font-bold text-sm mb-4">
						#MDU45632
					</Text>
				</View>

				{/* Status Timeline */}
				<View className="bg-white rounded-xl p-4 w-[48%]">
					<Text className="text-[#00eeff] font-semibold mb-2">
						Status Timeline
					</Text>
					<Text className="text-black mb-1">✓ Submitted</Text>
					<Text className="text-black mb-1">
						✓ Assigned to Officer
					</Text>
					<Text className="text-black mb-1">✓ In Progress</Text>
					<Text className="text-black">
						Estimated Resolution: 2 days
					</Text>
				</View>
			</View>

			{/* Details Section */}
			<View className="bg-white rounded-xl p-4">
				<Text className="text-[#00eeff] font-semibold mb-2">
					Details
				</Text>
				<Text className="text-black">Type: Garbage Collection</Text>
				<Text className="text-black">Date: 28 May 2025</Text>
				<Text className="text-black">
					Location: Villapuram TNHB colony
				</Text>
				<Text className="text-black">Mode: App</Text>
			</View>
		</ScrollView>
	);
};

export default MyComplaintsScreen;

import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
const Pie = ({ countryName, percentage }) => {
  //   const data = {
  //     labels: ["Swim"], // optional
  //     data: [0.4],
  //   };
  const per = (percentage * 0.01).toFixed(1);
  console.log("per tpye", typeof per);
  let data = {
    labels: [countryName],
    data: [],
  };

  console.log("data", data);
  console.log("per", per);

  const getData = () => {
    // setData({ labels: [`${countryName}`], data: [0.2] });
  };
  console.log("cryname", countryName);
  useEffect(() => {
    getData();
  }, []);
  return (
    <ProgressChart
      data={data}
      width={Dimensions.get("window").width}
      height={220}
      strokeWidth={22}
      radius={78}
      chartConfig={chartConfig}
      hideLegend={false}
    />
  );
};
const chartConfig = {
  backgroundGradientFrom: "#004170",
  //   backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#004170",
  //   backgroundGradientToOpacity: 0.5,
  backgroundColor: "#004170",
  color: (opacity = 1) => "red",
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
export default Pie;

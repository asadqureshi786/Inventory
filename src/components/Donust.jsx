import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

const ApexChart = ({ items }) => {
  const [categories, setCategories] = useState(
    items.map((item) => item.categories)
  );

  const red = [1,2,3,4,5,6,7,8,9];
  const newRed = items.reduce((redItem,redItem2)=> redItem + redItem2 )
  const categoryCount = items.reduce((acc, item) => {
  acc[item.categories] = (acc[item.categories] || 0) + 1;
  return acc;
}, {});
  console.log(categoryCount )

  const [state, setState] = useState({
    series: [74, 25, 151, 17],
    options: {
      chart: {
        type: "donut",
      },
      colors: ["#364153", "#2e3644", "#5d687a", "#798597"],

      labels: ["Foods", "Sports", "Education", "Electronis"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 500,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;

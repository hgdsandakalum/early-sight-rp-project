import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const NearEyeComparisonChart = () => {
  const [data, setData] = useState({
    labels: [
      "01/01",
      "01/02",
      "01/03",
      "01/04",
      "01/05",
      "01/06",
      "01/07",
      "01/08",
      "01/09",
      "02/10",
      "07/11",
      "07/12",
      "07/13",
      "07/14",
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: "rgba(215,4,134, 1)",
        strokeWidth: 2,
        itemName: "Left eye",
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: "rgba(178,107,136, 1)",
        strokeWidth: 2,
        itemName: "Right eye",
      },
    ],
  });

  const getLineNames = () => {
    return data.datasets.map((dataset) => {
      return dataset.itemName;
    });
  };

  const formatData = () => {
    return data.datasets.map((dataset) => {
      return {
        name: dataset.itemName,
        data: dataset.data,
        type: "line",
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: dataset.strokeWidth,
          color: dataset.color,
        },
        symbol: "circle",
        itemStyle: {
          color: dataset.color,
        },
      };
    });
  };

  const options = {
    tooltip: {
      trigger: "item",
      padding: [4, 12],
      borderRadius: 12,
      borderColor: "transparent",
    },
    legend: {
      bottom: "0%",
      data: getLineNames(),
    },
    xAxis: {
      name: "Date",
      type: "category",
      data: data.labels,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        alignWithLabel: true,
        interval: 0,
      },
      axisLabel: {
        color: "black",
        fontSize: 11,
        fontFamily: "Poppins",
      },
    },
    yAxis: [
      {
        name: "Score",
        type: "value",
        axisLine: {
          show: false,
          lineStyle: {
            color: "grey",
            opacity: 0.5,
          },
        },
        minInterval: 0.1,
        axisTick: {
          show: false,
        },
        axisLabel: {
          inside: true,
          margin: -15,
          color: "black",
          fontSize: 13,
          fontFamily: "Poppins",
        },
        scale: true,
        splitLine: {
          lineStyle: {
            color: "grey",
            opacity: 0.5,
          },
        },
      },
    ],
    series: formatData(),
  };

  const fetchChartData = async () => {
    const urlParts = window.location.href.split("/");
    const id = urlParts[urlParts.length - 2];
    const url =
      "https://retina-mobile-app-bankend.vercel.app/api/v1/test-results/user-stats-near/" +
      id +
      `?month=${new Date().getMonth()}&year=${new Date().getFullYear}`;

    console.log(url);
    const userData = await axios.get(
      "https://retina-mobile-app-bankend.vercel.app/api/v1/test-results/user-stats-near/" +
        id +
        `?month=${new Date().getMonth()+1}&year=${new Date().getFullYear()}`
    );

    if (userData.status === 200) {
      setData(userData.data.data);
    }
  };

  useEffect(() => {
    void fetchChartData();
  }, []);
  return (
    <div className=" mt-10">
      <div className=" flex flex-col">
        <span className=" text-lg font-bold">
          Overview Eye comparison - Near Distance(30cm)
        </span>
        <span className="">
          Overview comparison of patients vision tests score for Near distance
          visual acuity with LOGMar values for (3cm)
        </span>
      </div>

      <ReactECharts option={options} style={{ height: "25rem" }} />
    </div>
  );
};

export default NearEyeComparisonChart;

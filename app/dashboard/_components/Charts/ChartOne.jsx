"use client";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};

const ChartOne = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Product One",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },

      {
        name: "Product Two",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7 drop-shadow-md sm:px-7 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-4">
          <div className="flex min-w-[11.875rem]">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#3056D3]">
              <span className="block h-2 w-full max-w-2 rounded-full bg-[#3056D3]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#3056D3] text-sm sm:text-base">
                New Patients
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-500">
                12.04.2022 - 12.05.2022
              </p>
            </div>
          </div>
          <div className="flex min-w-[11.875rem]">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#80CAEE]">
              <span className="block h-2 w-full max-w-2 rounded-full bg-[#80CAEE]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#80CAEE] text-sm sm:text-base">
                Old Patients
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-500">
                12.04.2022 - 12.05.2022
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-[11.25rem] justify-end">
          <div className="inline-flex items-center rounded-md bg-[#f5f7fd] p-1.5">
            <button className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-md hover:bg-white hover:shadow-md ">
              Day
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-md">
              Week
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-md">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;

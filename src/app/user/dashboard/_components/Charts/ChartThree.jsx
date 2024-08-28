"use client";
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#fcb3ae", "#db392e", "#b00b00", "#420400"],
  labels: ["Mild DR", "Moderate DR", "Severe DR", "Proliferative DR"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree = () => {
  const [state, setState] = useState({
    series: [65, 34, 12, 56],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [65, 34, 12, 56],
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7 drop-shadow-md sm:px-7 xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-l sm:text-xl font-semibold text-black dark:text-white">
            Precentage of Cases by DR Stage
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#fcb3ae]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black">
              <span> Mild DR </span>
              <span> 65% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#db392e]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black">
              <span> Moderate DR </span>
              <span> 34% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#b00b00]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black">
              <span> Severe DR </span>
              <span> 45% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#420400]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black">
              <span> Proliferative DR </span>
              <span> 12% </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;

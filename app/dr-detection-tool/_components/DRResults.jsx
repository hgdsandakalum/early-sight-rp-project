"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import VerticalProgress from "../_components/VerticalProgressBar";

const DRResults = () => {
  const [progressState, setProgressState] = useState(22);
  const [progressState2, setProgressState2] = useState(80);

  //   useEffect(() => {
  //     setInterval(() => {
  //       setProgressState(
  //         (prevState) => prevState + Math.floor(Math.random() * 20) + 1
  //       ) % 100;
  //     }, 1000);
  //   }, []);

  //   setInterval(() => {
  //     setProgressState(
  //       (prevState) => prevState + Math.floor(Math.random() * 20) + (1 % 100)
  //     );
  //   }, 1000);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white drop-shadow-md">
        <div className="border-b border-stroke px-6 py-4">
          <h3 className="font-semibold text-black ">DR Detection Result</h3>
        </div>
        <div className="grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
          <div className="col-span-12 xl:col-span-6">
            <div className="px-6 pb-6">
              <h5 className="py-3 font-semibold text-sm sm:text-base">
                Left Eye
              </h5>
              <div className="flex justify-between">
                <div className="flex flex-col justify-center items-center box-content h-64 w-64 p-4 border-4 rounded border-dotted">
                  <svg
                    width="150"
                    height="150"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.6471 16.375L12.0958 14.9623C11.3351 14.2694 10.9547 13.923 10.5236 13.7918C10.1439 13.6762 9.73844 13.6762 9.35878 13.7918C8.92768 13.923 8.5473 14.2694 7.78652 14.9623L4.92039 17.5575M13.6471 16.375L13.963 16.0873C14.7238 15.3944 15.1042 15.048 15.5352 14.9168C15.9149 14.8012 16.3204 14.8012 16.7 14.9168C17.1311 15.048 17.5115 15.3944 18.2723 16.0873L19.4237 17.0896M13.6471 16.375L17.0469 19.4528M17 9C17 10.1046 16.1046 11 15 11C13.8954 11 13 10.1046 13 9C13 7.89543 13.8954 7 15 7C16.1046 7 17 7.89543 17 9ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="#cbd5e1"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="text-slate-500">Placeholder</span>
                </div>
                <VerticalProgress progress={progressState} />
              </div>
              <div className="mt-4">
                <textarea
                  rows={3}
                  disabled
                  placeholder="Explanation"
                  className="w-full rounded-lg text-xs border-[1px] border-stroke bg-transparent px-2 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ac accumsan ex. Curabitur pretium vitae diam quis aliquet.
                  Proin vitae iaculis mauris. Praesent eu diam consectetur,
                  consequat quam eget, pulvinar leo.
                </textarea>
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-6">
            <div className="px-6 pb-6">
              <h5 className="py-3 font-semibold text-sm sm:text-base">
                Right Eye
              </h5>
              <div className="flex justify-between">
                <div className="flex flex-col justify-center items-center box-content h-64 w-64 p-4 border-4 rounded border-dotted">
                  <svg
                    width="150"
                    height="150"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.6471 16.375L12.0958 14.9623C11.3351 14.2694 10.9547 13.923 10.5236 13.7918C10.1439 13.6762 9.73844 13.6762 9.35878 13.7918C8.92768 13.923 8.5473 14.2694 7.78652 14.9623L4.92039 17.5575M13.6471 16.375L13.963 16.0873C14.7238 15.3944 15.1042 15.048 15.5352 14.9168C15.9149 14.8012 16.3204 14.8012 16.7 14.9168C17.1311 15.048 17.5115 15.3944 18.2723 16.0873L19.4237 17.0896M13.6471 16.375L17.0469 19.4528M17 9C17 10.1046 16.1046 11 15 11C13.8954 11 13 10.1046 13 9C13 7.89543 13.8954 7 15 7C16.1046 7 17 7.89543 17 9ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="#cbd5e1"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="text-slate-500">Placeholder</span>
                </div>
                <VerticalProgress progress={progressState2} />
              </div>
              <div className="mt-4">
                <textarea
                  rows={3}
                  disabled
                  placeholder="Explanation"
                  className="w-full rounded-lg text-xs border-[1px] border-stroke bg-transparent px-2 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ac accumsan ex. Curabitur pretium vitae diam quis aliquet.
                  Proin vitae iaculis mauris. Praesent eu diam consectetur,
                  consequat quam eget, pulvinar leo.
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DRResults;

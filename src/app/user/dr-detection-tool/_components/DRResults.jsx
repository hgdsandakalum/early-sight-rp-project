"use client";
import React, { useEffect, useState, CSSProperties } from "react";
import Image from "next/image";
import VerticalProgress from "./VerticalProgressBar";

const CLASS_NAMES = [
  "No DR",
  "Mild DR",
  "Moderate DR",
  "Severe DR",
  "Proliferative DR",
];

const ResultPercentages = ({ scores }) => {
  const getPercentages = () => {
    if (!scores || !Array.isArray(scores)) return [];
    return scores.map((score) => (parseFloat(score) * 100).toFixed(2));
  };

  return (
    <div className="flex flex-col gap-2">
      {getPercentages().map((percentage, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-700">
            {CLASS_NAMES[index]}:
          </span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-xs font-semibold min-w-12 text-right">
              {percentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const DRResults = ({ patientProcessedEyes, patientEyesResult, isLoading }) => {
  const [progressState, setProgressState] = useState(0);
  const [progressState2, setProgressState2] = useState(0);
  const [leftEyeScores, setLeftEyeScores] = useState([]);
  const [rightEyeScores, setRightEyeScores] = useState([]);

  useEffect(() => {
    if (Array.isArray(patientEyesResult?.leftEyeImage?.prediction_scores)) {
      setLeftEyeScores(patientEyesResult.leftEyeImage.prediction_scores);
    }
    if (Array.isArray(patientEyesResult?.rightEyeImage?.prediction_scores)) {
      setRightEyeScores(patientEyesResult.rightEyeImage.prediction_scores);
    }
  }, [patientEyesResult]);

  useEffect(() => {
    setProgressState(patientEyesResult?.leftEyeImage?.predicted_index ?? 4);
    setProgressState2(patientEyesResult?.rightEyeImage?.predicted_index ?? 1);
  }, [patientEyesResult]);

  // useEffect(() => {
  //   setProgressState(4);
  //   setProgressState2(1);
  // }, []);

  useEffect(() => {
    setProgressState(patientEyesResult?.leftEyeImage?.predicted_index);
    setProgressState2(patientEyesResult?.rightEyeImage?.predicted_index);
  }, [patientEyesResult]);

  // useEffect(() => {
  //   setInterval(() => {
  //     setProgressState(
  //       (prevState) => prevState + Math.floor(Math.random() * 20) + 1
  //     ) % 100;
  //   }, 1000);
  // }, []);

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
                  {isLoading ? (
                    <div className="h-full w-full blur-xl flex flex-col justify-center items-center">
                      <div className="!blur-none animate-ping rounded-full h-32 w-32 bg-[#1a0e06] opacity-100"></div>
                    </div>
                  ) : patientProcessedEyes?.leftEyeImage ? (
                    <Image
                      src={patientProcessedEyes?.leftEyeImage}
                      style={{ objectFit: "cover" }}
                      width={64}
                      height={64}
                      className="h-64 w-64"
                    />
                  ) : (
                    <>
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
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-slate-500">Placeholder</span>
                    </>
                  )}
                </div>
                <VerticalProgress progress={progressState} />
              </div>
              <div className="mt-4">
                <div className="border-[1px] border-stroke text-red-950 px-2 py-2 rounded-lg text-xs w-full line-clamp-3 text-wrap">
                  <ResultPercentages scores={leftEyeScores} />
                </div>

                {/* <textarea
                  rows={3}
                  disabled
                  placeholder="Explanation"
                  className="w-full rounded-lg text-xs border-[1px] border-stroke bg-transparent px-2 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                >
                  {leftEyeResult}
                </textarea> */}
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
                  {isLoading ? (
                    <div className="h-full w-full blur-xl flex flex-col justify-center items-center">
                      <div className="!blur-none animate-ping rounded-full h-32 w-32 bg-[#1a0e06] opacity-100"></div>
                    </div>
                  ) : patientProcessedEyes?.rightEyeImage ? (
                    <Image
                      src={patientProcessedEyes?.rightEyeImage}
                      style={{ objectFit: "cover" }}
                      width={64}
                      height={64}
                      className="h-64 w-64"
                    />
                  ) : (
                    <>
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
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-slate-500">Placeholder</span>
                    </>
                  )}
                </div>
                <VerticalProgress progress={progressState2} />
              </div>
              <div className="mt-4">
                <div className="border-[1px] border-stroke text-red-950 px-2 py-2 rounded-lg text-xs w-full line-clamp-3 text-wrap">
                  <ResultPercentages scores={rightEyeScores} />
                </div>
                {/* <textarea
                  rows={3}
                  disabled
                  placeholder="Explanation"
                  className="w-full rounded-lg text-xs border-[1px] border-stroke bg-transparent px-2 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                >
                  {rightEyeResult}
                </textarea> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DRResults;

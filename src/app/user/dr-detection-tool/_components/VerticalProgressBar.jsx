"use client";
import React, { useState, useEffect } from "react";

const VerticalProgress = ({ progress }) => {
  const [stage1, setStage1] = useState(false);
  const [stage2, setStage2] = useState(false);
  const [stage3, setStage3] = useState(false);
  const [stage4, setStage4] = useState(false);

  useEffect(() => {
    console.log("progress", progress);
    if (progress >= 4) {
      setStage1(true);
      setStage2(true);
      setStage3(true);
      setStage4(true);
    } else if (progress >= 3) {
      setStage1(true);
      setStage2(true);
      setStage3(true);
    } else if (progress >= 2) {
      setStage1(true);
      setStage2(true);
    } else if (progress >= 1) {
      setStage1(true);
    }
  }, [progress]);

  return (
    <>
      <span
        className="rotate-180 text-xs"
        style={{ writingMode: "vertical-lr" }}
      >
        Severity Level
      </span>
      <div className="w-[40px] rounded-sm">
        <div className="grid grid-cols-1 h-full grid-rows-5 grid-flow-col gap-1 align-bottom">
          {stage4 ? (
            <div className="w-full h-full bg-red-950"></div>
          ) : (
            <div className="w-full h-full border border-red-100"></div>
          )}
          {stage3 ? (
            <div className="w-full h-full bg-red-800"></div>
          ) : (
            <div className="w-full h-full border border-red-100"></div>
          )}
          {stage2 ? (
            <div className="w-full h-full bg-red-500"></div>
          ) : (
            <div className="w-full h-full border border-red-100"></div>
          )}
          {stage1 ? (
            <div className="w-full h-full bg-red-200"></div>
          ) : (
            <div className="w-full h-full border border-red-100"></div>
          )}
          <div className="w-full h-full border-b-4 border-red-100 bg-red-50"></div>
        </div>
      </div>
    </>
  );
};

export default VerticalProgress;

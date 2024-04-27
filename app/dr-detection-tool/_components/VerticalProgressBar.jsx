"use client";
import React from "react";
import useMeasure from "react-use-measure";
import { useSpring, animated } from "@react-spring/web";
import "@styles/styles.css";

const VerticalProgress = ({ progress }) => {
  const [ref, { width }] = useMeasure();
  const props = useSpring({ width: 25 ? width : 0 });
  const height = "h-1/5";

  return (
    <>
      <span
        className="rotate-180 text-xs"
        style={{ writingMode: "vertical-lr" }}
      >
        Severity Level
      </span>
      <div className="w-[40px] rounded-sm">
        <div className="grid grid-cols-1 h-full grid-rows-5 grid-flow-col gap-1">
          <div className="w-full h-full bg-red-950"></div>
          <div className="w-full h-full bg-red-800"></div>
          <div className="w-full h-full bg-red-500"></div>
          <div className="w-full h-full bg-red-200"></div>
          <div className="w-full h-full border-b-4 border-slate-500 bg-red-50"></div>
        </div>
        {/* <div className={`w-full bg-amber-600 ${height}`}></div> */}
      </div>
    </>
  );
};

export default VerticalProgress;

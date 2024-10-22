"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RetinaImage from "../../../../../public/images/retina_img.jpg";

const LatestRetinaImages = ({ patientEyes }) => {
  const [progressState, setProgressState] = useState(5);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white drop-shadow-md">
        <div className="border-b border-stroke px-6 py-4">
          <h3 className="font-semibold text-black ">Latest Retina Images</h3>
        </div>
        <div className="grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
          <div className="col-span-12 xl:col-span-6">
            <div className="px-6 pb-6">
              <h5 className="py-3 font-semibold text-xs sm:text-sm">
                Left Eye
              </h5>
              <div className="box-content h-64 w-64 border-4 rounded border-dotted overflow-hidden">
                <Image
                  src={`data:image/png;base64,${patientEyes.leftEyeImage}`}
                  style={{ objectFit: "cover" }}
                  width={64}
                  height={64}
                  className="h-64 w-64"
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-6">
            <div className="px-6 pb-6">
              <h5 className="py-3 font-semibold text-xs sm:text-sm">
                Right Eye
              </h5>
              <div className="box-content h-64 w-64 border-4 rounded border-dotted overflow-hidden">
                <Image
                  src={`data:image/png;base64,${patientEyes.rightEyeImage}`}
                  style={{ objectFit: "cover" }}
                  width={64}
                  height={64}
                  className="h-64 w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestRetinaImages;

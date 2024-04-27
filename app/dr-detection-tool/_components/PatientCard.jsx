import React, { useState } from "react";
import Image from "next/image";

const PatientCard = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7 drop-shadow-md xl:col-span-4">
      <div className="mb-4 gap-4 sm:flex">
        <div className="flex flex-col">
          <span className="font-semibold">Brooklyn Simmons</span>
          <span className="text-sm text-gray-500">PT2023-T416</span>
        </div>
      </div>
      <div className="mt-6 mb-4 gap-12 sm:flex">
        <div className="flex flex-col">
          <span className="font-semibold">Mobile Number</span>
          <span className="text-sm text-gray-500">+447700960054</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Age</span>
          <span className="text-sm text-gray-500">44</span>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Address</span>
        <span className="text-sm text-gray-500">
          208 Olson Boulevard, Toyburgh
        </span>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Joined Date</span>
        <span className="text-sm text-gray-500">February 28, 2018</span>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Barcode</span>
        <img
          src="https://www.pngmart.com/files/10/Barcode-PNG-Pic.png"
          className="w-[90%]"
        />
      </div>
    </div>
  );
};

export default PatientCard;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Barcode from "react-barcode";

const PatientCard = ({ patient }) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7 drop-shadow-md xl:col-span-4">
      <div className="mb-4 gap-4 sm:flex">
        <div className="flex flex-col">
          <span className="font-semibold">
            {patient.firstName} {patient.lastName}
          </span>
          <span className="text-sm text-gray-500">{patient.id}</span>
        </div>
      </div>
      <div className="mt-6 mb-4 gap-12 sm:flex">
        <div className="flex flex-col">
          <span className="font-semibold ">Mobile Number</span>
          <span className="text-sm text-gray-500">{patient.mobile}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Age</span>
          <span className="text-sm text-gray-500">{patient.age}</span>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Email</span>
        <span className="text-sm text-gray-500">{patient.email}</span>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Joined Date</span>
        <span className="text-sm text-gray-500">{patient.joinedDate}</span>
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Barcode</span>
        <Barcode
          value={patient.id}
          height={75}
          width={2}
          displayValue={false}
        />
        {/* <img
          src="https://www.pngmart.com/files/10/Barcode-PNG-Pic.png"
          className="w-[90%]"
        /> */}
      </div>
    </div>
  );
};

export default PatientCard;
